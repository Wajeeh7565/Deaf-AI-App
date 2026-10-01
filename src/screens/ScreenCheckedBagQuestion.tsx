import React from 'react';
import { Luggage, Backpack } from 'lucide-react';
import { CommunicationMode,TextLanguageCode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';
import { t } from '../data/i18n';
import { lsqMedia, signMedia } from '../data/announcementMedia';
interface Props{onYesCheckedBag:()=>void;onNoCarryOnOnly:()=>void;commMode:CommunicationMode;textLanguage:TextLanguageCode;highContrast?:boolean;}
export const ScreenCheckedBagQuestion:React.FC<Props>=({onYesCheckedBag,onNoCarryOnOnly,commMode,textLanguage,highContrast=false})=>{
 const fr=textLanguage==='fr'||commMode==='lsq';
 return <div className="max-w-lg mx-auto w-full py-4 space-y-5">
  <div><div className="ys-kicker">{fr?'Avant la sécurité':'Before security'}</div><h1 className={`text-[2.0rem] leading-[1.05] font-black tracking-tight mt-1 ${highContrast?'text-white':'text-[#062a4d]'}`}>{t(textLanguage,'bagQuestion')}</h1></div>
  {commMode!=='text'&&<SignLanguagePlayer commMode={commMode} title={commMode==='lsq'?'LSQ 2 · Bagages':'Checked bag'} captionText={fr?'Bagage enregistré → comptoir de dépôt. Sinon → sécurité.':'Checked bag → bag drop. Otherwise → security.'} videoSrc={signMedia('2', commMode === 'lsq' ? 'lsq' : 'asl').src} announcementCode={'2'} compact highContrast={highContrast}/>} 
  <div className="grid grid-cols-2 gap-3">
   <button onClick={onYesCheckedBag} className="ys-card min-h-[170px] p-5 text-left border-2 border-transparent hover:!border-[#087f7b]"><div className="w-12 h-12 rounded-2xl bg-[#062a4d] text-white flex items-center justify-center"><Luggage className="w-6 h-6"/></div><div className="mt-5 text-xl font-black text-[#062a4d]">{fr?'Oui':'Yes'}</div><div className="text-xs text-[#65717c] mt-1">{fr?'Déposer un bagage':'Check a bag'}</div></button>
   <button onClick={onNoCarryOnOnly} className="ys-card min-h-[170px] p-5 text-left border-2 border-transparent hover:!border-[#087f7b]"><div className="w-12 h-12 rounded-2xl bg-[#dff7f5] text-[#087f7b] flex items-center justify-center"><Backpack className="w-6 h-6"/></div><div className="mt-5 text-xl font-black text-[#062a4d]">{fr?'Non':'No'}</div><div className="text-xs text-[#65717c] mt-1">{fr?'Bagage à main seulement':'Carry-on only'}</div></button>
  </div>
 </div>;
};
