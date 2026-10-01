import React,{useEffect,useState} from 'react';
import { AlertTriangle,ArrowRight,Navigation,Clock } from 'lucide-react';
import { Flight,CommunicationMode,TextLanguageCode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';
import { lsqMedia, signMedia } from '../data/announcementMedia';
import { jt } from '../data/textJourneyCopy';
import { PilotJobState, requestPilotVideo } from '../lib/deafAiVideoApi';

interface Props{
  flight:Flight;
  oldGate:string;
  newGate:string;
  onShowNewRoute:()=>void;
  onDismiss:()=>void;
  commMode:CommunicationMode;
  textLanguage:TextLanguageCode;
  highContrast?:boolean;
}

export const ScreenGateChangeAlert:React.FC<Props>=({
  flight,
  oldGate='4',
  newGate='6',
  onShowNewRoute,
  onDismiss,
  commMode,
  textLanguage,
  highContrast=false
})=>{
  const [pilotVideoUrl,setPilotVideoUrl]=useState('');
  const [pilotState,setPilotState]=useState<PilotJobState>('idle');
  const [pilotError,setPilotError]=useState('');

  const fr=textLanguage==='fr'||commMode==='lsq';
  const es=textLanguage==='es'&&commMode==='text';
  const local=(en:string,frText:string,esText:string)=>fr?frText:es?esText:en;

  const localVideoSrc=signMedia('5.4',commMode==='lsq'?'lsq':'asl').src;
  const activeVideoSrc=pilotVideoUrl||localVideoSrc;

  const loadPilotVideo=async()=>{
    if(commMode!=='asl') return;

    setPilotError('');
    setPilotVideoUrl('');

    try{
      const url=await requestPilotVideo({
        airportName:'Region of Waterloo International Airport',
        gateNumber:newGate,
        airlineName:flight.airline,
        destinationName:flight.destination,
        flightNumber:flight.flightNumber,
        announcementType:'gate_change',
        language:'ASL',
      },setPilotState);

      setPilotVideoUrl(url);
    }catch(error){
      setPilotState('failed');
      setPilotError(
        error instanceof Error
          ? error.message
          : 'Could not load pilot API video.'
      );
    }
  };

  useEffect(()=>{
    if(commMode==='asl'){
      void loadPilotVideo();
    }
  },[
    commMode,
    newGate,
    flight.airline,
    flight.destination,
    flight.flightNumber
  ]);

  return <div className="max-w-lg mx-auto w-full py-4 space-y-4">

    <div className="flex justify-center">
      <span className="ys-chip bg-[#fff7e8] text-[#8c5100] border border-[#f1d7a7]">
        {jt(textLanguage,'simulatedEvent')}
      </span>
    </div>

    <section className={`rounded-[28px] overflow-hidden border-2 ${
      highContrast?'bg-black border-yellow-400':'bg-[#fff5f3] border-[#f2b8b2]'
    }`}>
      <div className="bg-[#b42318] text-white px-5 py-3 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5"/>
        <span className="text-sm font-black uppercase tracking-wider">
          {local('Gate changed','Porte changée','Puerta cambiada')}
        </span>
      </div>

      <div className="p-6 text-center">
        <div className="text-[0.75rem] font-bold text-[#65717c]">
          {flight.flightNumber} · {flight.destination}
        </div>

        <div className="mt-4 flex items-center justify-center gap-5">
          <div>
            <div className="text-[0.75rem] uppercase font-bold text-[#8a949d]">
              {local('Previous','Ancienne','Anterior')}
            </div>
            <div className="text-4xl font-black text-[#8a949d] line-through">
              {oldGate}
            </div>
          </div>

          <ArrowRight className="w-8 h-8 text-[#b42318]"/>

          <div>
            <div className="text-[0.75rem] uppercase font-black text-[#b42318]">
              {local('New gate','Nouvelle porte','Nueva puerta')}
            </div>
            <div className="text-[4.5rem] leading-none font-black text-[#b42318]">
              {newGate}
            </div>
          </div>
        </div>

        <div className="mt-4 text-[0.75rem] text-[#65717c] flex items-center justify-center gap-1">
          <Clock className="w-3.5 h-3.5"/>
          {local('Updated just now','Mis à jour maintenant','Actualizado ahora')}
        </div>
      </div>
    </section>

    {commMode!=='text'&&<>
      <SignLanguagePlayer
        commMode={commMode}
        title={fr?'LSQ 5.4 · Changement de porte':'Gate change'}
        captionText={
          fr
            ? `${lsqMedia('5.4').fr} Porte ${newGate}.`
            : `Your gate has changed from ${oldGate} to ${newGate}.`
        }
        videoSrc={activeVideoSrc}
        announcementCode="5.4"
        autoPlay={Boolean(pilotVideoUrl)}
        compact
        highContrast={highContrast}
      />

      {commMode==='asl'&&
        <div className="ys-card p-3 text-center">
          <button
            disabled={['requesting','pending','running'].includes(pilotState)}
            onClick={loadPilotVideo}
            className="ys-secondary w-full disabled:opacity-60"
          >
            {['requesting','pending','running'].includes(pilotState)
              ? 'Loading Deaf AI API video…'
              : pilotVideoUrl
                ? 'Reload API video'
                : 'Load pilot API video'}
          </button>

          <p className="mt-2 text-[0.72rem] text-[#65717c]">
            {pilotVideoUrl
              ? 'API video loaded. The temporary URL will expire.'
              : 'Pilot API connected to YKF announcement videos.'}
          </p>

          {pilotError&&
            <p className="mt-2 text-[0.72rem] font-bold text-[#b42318]">
              {pilotError}
            </p>}
        </div>}
    </>}

    {commMode==='text'&&
      <div className="ys-card p-4">
        <div className="text-[0.75rem] uppercase tracking-wider font-black text-[#087f7b]">
          {jt(textLanguage,'textJourney')}
        </div>
        <div className="mt-1 text-sm font-bold text-[#062a4d]">
          {local(
            `Your gate changed from ${oldGate} to ${newGate}.`,
            `Votre porte est passée de ${oldGate} à ${newGate}.`,
            `Tu puerta cambió de ${oldGate} a ${newGate}.`
          )}
        </div>
        <div className="mt-2 text-[0.75rem] text-[#7a858e]">
          {jt(textLanguage,'liveDataPending')}
        </div>
      </div>}

    <button
      onClick={onShowNewRoute}
      className="ys-primary w-full flex items-center justify-center gap-2"
    >
      <Navigation className="w-5 h-5"/>
      {local(
        `Route to Gate ${newGate}`,
        `Trajet vers la porte ${newGate}`,
        `Ruta a la Puerta ${newGate}`
      )}
    </button>

    <button
      onClick={onDismiss}
      className="w-full h-11 text-sm font-bold text-[#65717c]"
    >
      {local('Dismiss','Fermer','Cerrar')}
    </button>

  </div>;
};

