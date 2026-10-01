import React,{useEffect,useState} from 'react';
import { Clock,AlertTriangle,CheckCircle2,XCircle,MessageSquare,RefreshCw,Navigation,UserCheck,BellRing } from 'lucide-react';
import { Flight,CommunicationMode,TextLanguageCode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';
import { lsqMedia, signMedia } from '../data/announcementMedia';
import { jt } from '../data/textJourneyCopy';
import { PilotAnnouncementType, PilotJobState, requestPilotVideo } from '../lib/deafAiVideoApi';
interface Props{variant:'delayed'|'boarding'|'final_call'|'cancelled'|'paging'|'live_unavailable'|'journey_complete';flight:Flight;onReturnToDashboard:()=>void;onShowRoute:()=>void;onTalkWithStaff:()=>void;onRestartJourney:()=>void;commMode:CommunicationMode;textLanguage:TextLanguageCode;highContrast?:boolean;}
export const ScreenEventVariants:React.FC<Props>=({variant,flight,onReturnToDashboard,onShowRoute,onTalkWithStaff,onRestartJourney,commMode,textLanguage,highContrast=false})=>{
 const [retry,setRetry]=useState(false);
 const [pilotVideoUrl,setPilotVideoUrl]=useState<string>('');
 const [pilotState,setPilotState]=useState<PilotJobState>('idle');
 const [pilotError,setPilotError]=useState<string>('');
 const fr=textLanguage==='fr'||commMode==='lsq'; const es=textLanguage==='es'&&commMode==='text'; const local=(en:string,frText:string,esText:string)=>fr?frText:es?esText:en;
 const autoPilotType: PilotAnnouncementType | null =
  variant==='delayed'?'delayed':
  variant==='boarding'?'boarding':
  variant==='final_call'?'final_call':
  variant==='cancelled'?'cancelled':
  variant==='paging'?'passenger_page':
  null;

 useEffect(()=>{
  if(commMode!=='asl' || !autoPilotType) return;

  let cancelled=false;

  setPilotError('');
  setPilotVideoUrl('');

  requestPilotVideo({
   airportName:'Region of Waterloo International Airport',
   gateNumber:flight.gate,
   airlineName:flight.airline,
   destinationName:flight.destination,
   flightNumber:flight.flightNumber,
   announcementType:autoPilotType,
   language:'ASL',
  },(state)=>{
   if(!cancelled) setPilotState(state);
  })
  .then((url)=>{
   if(!cancelled) setPilotVideoUrl(url);
  })
  .catch((error)=>{
   if(cancelled) return;
   setPilotState('failed');
   setPilotError(
    error instanceof Error
     ? error.message
     : 'Could not load pilot API video.'
   );
  });

  return ()=>{cancelled=true;};
 },[
  variant,
  commMode,
  flight.gate,
  flight.airline,
  flight.destination,
  flight.flightNumber
 ]);

 if(variant==='journey_complete') return <div className="max-w-lg mx-auto py-8"><div className="ys-card p-7 text-center"><div className="w-16 h-16 mx-auto rounded-full bg-[#e6f5ec] text-[#1b6b45] flex items-center justify-center"><CheckCircle2 className="w-8 h-8"/></div><h1 className="mt-5 text-3xl font-black text-[#062a4d]">{local('Journey complete','Trajet terminÃ©','Recorrido terminado')}</h1><p className="mt-2 text-sm text-[#65717c]">{local('Flight alerts for this journey have ended.','Les alertes pour ce vol sont terminÃ©es.','Las alertas de este vuelo han terminado.')}</p><button onClick={onRestartJourney} className="ys-primary w-full mt-6">{local('Start another journey','Nouveau trajet','Iniciar otro recorrido')}</button></div></div>;
 if(variant==='live_unavailable') return <div className="max-w-lg mx-auto py-8 space-y-4"><div className="ys-card p-6 text-center border-[#f1d7a7]"><div className="w-14 h-14 mx-auto rounded-2xl bg-[#fff0d9] text-[#8c5100] flex items-center justify-center"><AlertTriangle className="w-7 h-7"/></div><h1 className="mt-4 text-2xl font-black text-[#062a4d]">{local('Live data unavailable','DonnÃ©es en direct indisponibles','Datos en vivo no disponibles')}</h1><p className="mt-2 text-sm text-[#65717c]">{local('Last updated 10:42 AM. Confirm with airport staff.','DerniÃ¨re mise Ã  jour : 10 h 42. Confirmez avec le personnel.','Ãšltima actualizaciÃ³n 10:42. Confirma con el personal.')}</p></div><button onClick={()=>{setRetry(true);setTimeout(()=>{setRetry(false);onReturnToDashboard()},800)}} className="ys-primary w-full flex items-center justify-center gap-2"><RefreshCw className={`w-5 h-5 ${retry?'animate-spin':''}`}/>{local('Try again','RÃ©essayer','Intentar de nuevo')}</button><button onClick={onTalkWithStaff} className="ys-secondary w-full">{local('Talk with staff','Parler au personnel','Hablar con el personal')}</button></div>;
 const config:any={
  delayed:{code:'5.1',icon:Clock,kicker:local('Schedule update','Horaire mis Ã  jour','Horario actualizado'),title:local('FLIGHT DELAYED','RETARD','VUELO RETRASADO'),tone:'amber',value:'11:20 AM',sub:local(`Gate ${flight.gate} Â· unchanged`,`Porte ${flight.gate} Â· inchangÃ©e`,`Puerta ${flight.gate} Â· sin cambios`),caption:fr?`${lsqMedia('5.1').fr} Nouvelle heure : 11 h 20.`:es?`Vuelo retrasado. Nueva salida 11:20. Puerta ${flight.gate}.`:`Flight delayed. New departure time 11:20 AM. Gate ${flight.gate}.`},
  boarding:{code:'4.5',icon:BellRing,kicker:local('Boarding','Embarquement','Embarque'),title:local('BOARDING','EMBARQUEMENT','EMBARQUE'),tone:'navy',value:`${local('GATE','PORTE','PUERTA')} ${flight.gate}`,sub:local('Have your boarding pass ready','PrÃ©parez votre carte dâ€™embarquement','Ten lista tu tarjeta de embarque'),caption:fr?lsqMedia('4.5').fr:es?`El embarque ha comenzado. DirÃ­gete a la Puerta ${flight.gate}.`:`Boarding has started. Please come to Gate ${flight.gate}.`},
  final_call:{code:'4.6',icon:AlertTriangle,kicker:local('Urgent','Urgent','Urgente'),title:local('FINAL CALL','DERNIER APPEL','ÃšLTIMA LLAMADA'),tone:'red',value:`${local('GATE','PORTE','PUERTA')} ${flight.gate}`,sub:local('Go to the gate now','Allez Ã  la porte maintenant','Ve a la puerta ahora'),caption:fr?lsqMedia('4.6').fr:es?`Ãšltima llamada de embarque. DirÃ­gete a la Puerta ${flight.gate} inmediatamente.`:`Final boarding call. Proceed to Gate ${flight.gate} immediately.`},
  cancelled:{code:'5.5',icon:XCircle,kicker:local('Flight update','Mise Ã  jour du vol','ActualizaciÃ³n del vuelo'),title:local('FLIGHT CANCELLED','VOL ANNULÃ‰','VUELO CANCELADO'),tone:'gray',value:flight.destination,sub:local('Go to the airline service desk','Allez au comptoir de la compagnie','Ve al mostrador de la aerolÃ­nea'),caption:fr?lsqMedia('5.5').fr:es?'Este vuelo fue cancelado. Ve al mostrador de la aerolÃ­nea.':'This flight has been cancelled. Please go to the airline service desk.'},
  paging:{code:'5.6',icon:UserCheck,kicker:local('Passenger page','Appel passager','Aviso a pasajero'),title:local('PASSENGER PAGING','APPEL PASSAGER','AVISO A PASAJERO'),tone:'purple',value:'M. Still, Jay',sub:local(`Please proceed to Gate ${flight.gate}`,`Veuillez aller Ã  la porte ${flight.gate}`,`DirÃ­gete a la Puerta ${flight.gate}`),caption:fr?lsqMedia('5.6').fr:es?`Pasajero Jay Still, dirÃ­gete a la Puerta ${flight.gate}.`:`Passenger Jay Still, please proceed to Gate ${flight.gate}.`}
 }[variant];
 const toneMap:Record<string,string[]>={amber:['bg-[#fff7e8]','text-[#8c5100]','bg-[#a76100]'],navy:['bg-[#eef5fb]','text-[#062a4d]','bg-[#062a4d]'],red:['bg-[#fff1ef]','text-[#b42318]','bg-[#b42318]'],gray:['bg-[#f1f3f5]','text-[#3f4750]','bg-[#3f4750]'],purple:['bg-[#f5eff9]','text-[#68458c]','bg-[#68458c]']}; const tone=toneMap[String(config.tone)]; const Icon=config.icon;
 const pilotType: PilotAnnouncementType | null = variant==='delayed'?'delayed':variant==='boarding'?'boarding':variant==='final_call'?'final_call':variant==='cancelled'?'cancelled':variant==='paging'?'passenger_page':null;
 const canLoadPilotVideo = commMode==='asl' && Boolean(pilotType);
 const localVideoSrc = signMedia(config.code, commMode === 'lsq' ? 'lsq' : 'asl').src;
 const activeVideoSrc = pilotVideoUrl || localVideoSrc;
 const loadPilotVideo = async()=>{
  if(!pilotType || commMode!=='asl') return;
  setPilotError(''); setPilotVideoUrl('');
  try{
   const url=await requestPilotVideo({
    airportName:'Region of Waterloo International Airport',
    gateNumber:flight.gate,
    airlineName:flight.airline,
    destinationName:flight.destination,
    flightNumber:flight.flightNumber,
    announcementType:pilotType,
    language:'ASL',
   },setPilotState);
   setPilotVideoUrl(url);
  }catch(error){
   setPilotState('failed');
   setPilotError(error instanceof Error?error.message:'Could not load pilot API video.');
  }
 };
 return <div className="max-w-lg mx-auto w-full py-4 space-y-4">
  <div className="flex justify-center"><span className="ys-chip bg-[#fff7e8] text-[#8c5100] border border-[#f1d7a7]">{jt(textLanguage,'simulatedEvent')}</span></div>
  <section className={`rounded-[28px] p-6 text-center border border-[#e4e8eb] ${tone[0]}`}><div className={`w-14 h-14 mx-auto rounded-2xl text-white flex items-center justify-center ${tone[2]}`}><Icon className="w-7 h-7"/></div><div className={`mt-4 text-[0.75rem] uppercase tracking-[.12em] font-black ${tone[1]}`}>{config.kicker}</div><h1 className={`mt-1 text-[2.125rem] leading-none font-black ${tone[1]}`}>{config.title}</h1><div className="mt-6 bg-white rounded-2xl border border-white/70 p-5"><div className="text-[2.25rem] leading-tight font-black text-[#062a4d]">{config.value}</div><div className="mt-1 text-sm font-semibold text-[#65717c]">{config.sub}</div></div></section>
  {commMode!=='text'&&<>
   <SignLanguagePlayer commMode={commMode} title={`${commMode==='lsq'?'LSQ':'ASL'} ${config.code}`} captionText={config.caption} videoSrc={activeVideoSrc} announcementCode={config.code} autoPlay={Boolean(pilotVideoUrl)} compact highContrast={highContrast}/>
   {canLoadPilotVideo&&<div className="ys-card p-3 text-center">
    <button disabled={['requesting','pending','running'].includes(pilotState)} onClick={loadPilotVideo} className="ys-secondary w-full disabled:opacity-60">
     {['requesting','pending','running'].includes(pilotState)?'Loading Deaf AI API videoâ€¦':pilotVideoUrl?'Reload API video':'Load pilot API video'}
    </button>
    <p className="mt-2 text-[0.72rem] text-[#65717c]">
     {pilotVideoUrl?'API video loaded. The temporary URL will expire.':pilotState==='running'?'Video is being preparedâ€¦':pilotState==='pending'?'Waiting for video jobâ€¦':'Pilot API connected to YKF announcement videos.'}
    </p>
    {pilotError&&<p className="mt-2 text-[0.72rem] font-bold text-[#b42318]">{pilotError}</p>}
   </div>}
  </>} 
  {commMode==='text'&&<div className="ys-card p-4"><div className="text-[0.75rem] uppercase tracking-wider font-black text-[#087f7b]">{jt(textLanguage,'textJourney')}</div><div className="mt-1 text-sm font-bold text-[#062a4d]">{config.caption}</div><div className="mt-2 text-[0.75rem] text-[#7a858e]">{jt(textLanguage,'liveDataPending')}</div></div>}
  <div className="space-y-2">{['boarding','final_call'].includes(variant)&&<button onClick={onShowRoute} className="ys-primary w-full flex items-center justify-center gap-2"><Navigation className="w-5 h-5"/>{local('Show route','Afficher le trajet','Mostrar ruta')}</button>}{variant==='cancelled'&&<button onClick={onTalkWithStaff} className="ys-primary w-full flex items-center justify-center gap-2"><MessageSquare className="w-5 h-5"/>{local('Talk with staff','Parler au personnel','Hablar con el personal')}</button>}<button onClick={onReturnToDashboard} className="ys-secondary w-full">{local('Back to flight','Retour au vol','Volver al vuelo')}</button></div>
 </div>;
};



