import React from 'react';
import { X, HandHelping } from 'lucide-react';
import { CommunicationMode, TextLanguageCode } from '../types';
import { AccessibleDialog } from './AccessibleDialog';
interface Props { isOpen: boolean; onClose: () => void; commMode: CommunicationMode; textLanguage: TextLanguageCode; highContrast?: boolean; }
export const HelpModal: React.FC<Props> = ({ isOpen, onClose, commMode, textLanguage }) => {
  if (!isOpen) return null;
  const fr = commMode === 'lsq' || textLanguage === 'fr'; const es = textLanguage === 'es';
  const local = (en: string, french: string, spanish: string) => fr ? french : es ? spanish : en;
  const title = local('Ask airport staff for help', 'Demandez de l’aide au personnel', 'Pide ayuda al personal');
  return <AccessibleDialog label={title} onClose={onClose}><div className="ys-card p-5 space-y-4">
    <div className="flex items-center gap-3"><HandHelping aria-hidden="true"/><h2 className="text-xl font-black flex-1">{title}</h2>
      <button onClick={onClose} aria-label={local('Close', 'Fermer', 'Cerrar')}><X/></button></div>
    <p>{local('Show this card to an airline or airport staff member.', 'Montrez cette carte à un membre du personnel de l’aéroport ou de votre compagnie.', 'Muestra esta tarjeta al personal del aeropuerto o de tu aerolínea.')}</p>
    <div className="rounded-2xl border-2 border-[#087f7b] p-5 text-xl font-bold">{local('I am Deaf or hard of hearing. Please face me and write down important information. I need assistance.', 'Je suis une personne sourde ou malentendante. Veuillez me faire face et écrire les informations importantes. J’ai besoin d’aide.', 'Soy una persona sorda o con pérdida auditiva. Por favor, mírame y escribe la información importante. Necesito ayuda.')}</div>
    <p className="text-sm">{local('This demo cannot contact staff or send an assistance request.', 'Cette démo ne peut pas contacter le personnel ni envoyer une demande d’aide.', 'Esta demo no puede contactar al personal ni enviar una solicitud de ayuda.')}</p>
    <button onClick={onClose} className="ys-primary w-full">{local('Back to journey', 'Retour au trajet', 'Volver al recorrido')}</button>
  </div></AccessibleDialog>;
};
