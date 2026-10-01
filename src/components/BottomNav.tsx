import React from 'react';
import { Plane, Navigation, MessageSquare, Settings } from 'lucide-react';
import { ScreenId, TextLanguageCode } from '../types';
interface Props { currentScreen:ScreenId; onNavigate:(screen:ScreenId)=>void; highContrast?:boolean; textLanguage?:TextLanguageCode; }
export const BottomNav:React.FC<Props>=({currentScreen,onNavigate,highContrast=false,textLanguage='en'})=>{
 const show=['gate_dashboard','route_to_gate','talk_with_staff','settings','event_delayed','event_boarding','event_final_call','event_cancelled','event_paging','event_live_unavailable'].includes(currentScreen); if(!show)return null;
 const labels=textLanguage==='fr'?['Vol','Trajet','Aide','Réglages']:textLanguage==='es'?['Vuelo','Ruta','Personal','Ajustes']:['Flight','Route','Staff','Settings'];
 const items=[
  {id:'gate_dashboard' as ScreenId,label:labels[0],icon:Plane,active:currentScreen==='gate_dashboard'||currentScreen.startsWith('event_')},
  {id:'route_to_gate' as ScreenId,label:labels[1],icon:Navigation,active:currentScreen==='route_to_gate'},
  {id:'talk_with_staff' as ScreenId,label:labels[2],icon:MessageSquare,active:currentScreen==='talk_with_staff'},
  {id:'settings' as ScreenId,label:labels[3],icon:Settings,active:currentScreen==='settings'}];
 return <nav className={`ykf-bottom-nav fixed bottom-0 inset-x-0 z-40 border-t px-2 flex items-start justify-around ${highContrast?'bg-black text-white border-white':'bg-white/98 text-[#59636e] border-[#dce3e8] shadow-[0_-6px_20px_rgba(6,42,77,.06)]'}`}>
  {items.map(({id,label,icon:Icon,active})=><button key={id} aria-current={active ? "page" : undefined} onClick={()=>onNavigate(id)} className={`ykf-nav-button min-w-[68px] h-[58px] rounded-2xl flex flex-col items-center justify-center gap-0.5 transition active:scale-[.96] ${active?(highContrast?'bg-yellow-400 text-black':'bg-[#dff7f5] text-[#062a4d]'):'hover:bg-[#f3f6f7]'}`}><Icon className={`w-5 h-5 ${active?'stroke-[2.6]':'stroke-[1.9]'}`}/><span className="text-[0.75rem] font-bold">{label}</span></button>)}
 </nav>;
};
