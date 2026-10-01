import React, { useState } from 'react';
import { Trash2, ArrowLeft } from 'lucide-react';
import { CommunicationMode, TextLanguageCode } from '../types';
interface Props { onBack: () => void; commMode: CommunicationMode; textLanguage: TextLanguageCode; highContrast?: boolean; }
export const ScreenTalkWithStaff: React.FC<Props> = ({ onBack, commMode, textLanguage }) => {
  const [text, setText] = useState('');
  const fr = commMode === 'lsq' || textLanguage === 'fr'; const es = textLanguage === 'es';
  const local = (en: string, french: string, spanish: string) => fr ? french : es ? spanish : en;
  return <div className="max-w-lg mx-auto py-4 space-y-4">
    <h1 className="text-3xl font-black text-[#062a4d]">{local('Talk with staff', 'Parler au personnel', 'Hablar con el personal')}</h1>
    <p>{local('Type a message, then show your screen. Staff can type their reply here too.', 'Écrivez un message et montrez votre écran. Le personnel peut aussi écrire sa réponse ici.', 'Escribe un mensaje y muestra la pantalla. El personal también puede escribir su respuesta aquí.')}</p>
    <label htmlFor="staff-message" className="block font-bold">{local('Your conversation', 'Votre conversation', 'Tu conversación')}</label>
    <textarea id="staff-message" value={text} onChange={e => setText(e.target.value)} rows={7}
      className="w-full ys-card p-4 text-2xl leading-relaxed text-[#062a4d] resize-y"
      placeholder={local('Type here…', 'Écrivez ici…', 'Escribe aquí…')}/>
    <button onClick={() => setText('')} className="ys-secondary w-full flex items-center justify-center gap-2"><Trash2 size={18}/>{local('Clear message', 'Effacer le message', 'Borrar mensaje')}</button>
    <p className="text-sm text-[#59636e]">{local('Speech transcription is not connected in this demo. Typed messages are not saved.', 'La transcription vocale n’est pas connectée dans cette démo. Les messages écrits ne sont pas enregistrés.', 'La transcripción de voz no está conectada en esta demo. Los mensajes escritos no se guardan.')}</p>
    <button onClick={onBack} className="ys-primary w-full flex items-center justify-center gap-2"><ArrowLeft size={18}/>{local('Back to flight', 'Retour au vol', 'Volver al vuelo')}</button>
  </div>;
};
