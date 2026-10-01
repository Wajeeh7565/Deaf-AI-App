import React from 'react';
import { ArrowLeft,DoorOpen,Luggage,Plane,ShieldCheck,TicketCheck,Waypoints } from 'lucide-react';
import { TextLanguageCode } from '../types';
import { YKF_MEDIA } from '../data/ykfMedia';
import { YkfPhotoCarousel } from '../components/YkfPhotoCarousel';
import { jt } from '../data/textJourneyCopy';

interface Props{language:TextLanguageCode;onBack:()=>void;}
export const ScreenVisualJourney:React.FC<Props>=({language,onBack})=>{
 const groups=[
  {icon:DoorOpen,title:jt(language,'arrive'),body:jt(language,'arriveBody'),photos:[YKF_MEDIA.entrance,YKF_MEDIA.terminalBuilding]},
  {icon:TicketCheck,title:jt(language,'checkIn'),body:jt(language,'checkInBody'),photos:[YKF_MEDIA.checkinArea,YKF_MEDIA.lobbyKiosks,YKF_MEDIA.lobbyQueuesLeft,YKF_MEDIA.checkinCounters,YKF_MEDIA.lobbyQueuesFront,YKF_MEDIA.kioskAll,YKF_MEDIA.kioskWestJet,YKF_MEDIA.kioskFlair]},
  {icon:Luggage,title:jt(language,'bags'),body:jt(language,'bagsBody'),photos:[YKF_MEDIA.kioskAll,YKF_MEDIA.checkinCounters,YKF_MEDIA.lobbyQueuesFront]},
  {icon:ShieldCheck,title:jt(language,'security'),body:jt(language,'securityBody'),photos:[YKF_MEDIA.catsa]},
  {icon:Plane,title:jt(language,'gate'),body:jt(language,'gateBody'),photos:[YKF_MEDIA.gateEntrance,YKF_MEDIA.gateWestJet,YKF_MEDIA.gateFlair]},
 ];
 return <div className="max-w-lg mx-auto w-full py-3 space-y-4">
  <div className="ys-card p-5 bg-[linear-gradient(145deg,#eefafa,#f7fbfd)]"><div className="flex items-start gap-3"><div className="w-12 h-12 rounded-2xl bg-[#062a4d] text-white flex items-center justify-center"><Waypoints className="w-6 h-6"/></div><div><div className="ys-kicker">{jt(language,'officialPhotos')}</div><h1 className="text-[1.75rem] leading-tight font-black text-[#062a4d]">{jt(language,'visualJourney')}</h1><p className="text-sm text-[#59636e] mt-1 leading-snug">{jt(language,'visualJourneyIntro')}</p></div></div></div>
  {groups.map(({icon:Icon,title,body,photos})=><div key={title} className="space-y-2"><div className="flex items-start gap-3 px-1"><div className="w-10 h-10 rounded-xl bg-[#dff7f5] text-[#087f7b] flex items-center justify-center shrink-0"><Icon className="w-5 h-5"/></div><div><h2 className="font-black text-[#062a4d]">{title}</h2><p className="text-[0.75rem] text-[#65717c] leading-snug mt-0.5">{body}</p></div></div><YkfPhotoCarousel photos={photos} language={language} title={title} note={jt(language,'swipePhotos')} autoAdvance/></div>)}
  <div className="ys-card p-4 flex items-center gap-3"><img src={YKF_MEDIA.regionLogo.src} alt={language==='fr'?YKF_MEDIA.regionLogo.altFr:YKF_MEDIA.regionLogo.altEn} className="w-16 h-16 object-contain bg-white border border-[#dce3e8] rounded-xl p-1"/><div className="text-[0.75rem] text-[#65717c]">{language==='fr'?'Visuel YKF fourni avec les photos de l’aéroport.':'YKF visual supplied with the airport photo package.'}</div></div>
  <button onClick={onBack} className="ys-secondary w-full flex items-center justify-center gap-2"><ArrowLeft className="w-4 h-4"/>{jt(language,'backToStart')}</button>
 </div>;
};
