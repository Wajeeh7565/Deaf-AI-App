import { flightStatusLabel } from '../data/flightStatusLabel';
import React, { useState } from 'react';
import { Navigation, Bell, MessageSquare, Clock, Sparkles, ChevronRight, RefreshCw, Info } from 'lucide-react';
import { Flight, CommunicationMode, TextLanguageCode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';
import { AirlineLogo } from '../components/AirlineLogo';
import { lsqMedia, signMedia } from '../data/announcementMedia';
import { YkfReferencePhoto } from '../components/YkfReferencePhoto';
import { getGatePhoto } from '../data/ykfMedia';
import { jt } from '../data/textJourneyCopy';

interface Props {
  flight: Flight;
  onShowRoute: () => void;
  onOpenFlightUpdates: () => void;
  onTalkWithStaff: () => void;
  onChangeFlight: () => void;
  onTriggerEventScenario: (eventKey: string) => void;
  commMode: CommunicationMode;
  textLanguage: TextLanguageCode;
  highContrast?: boolean;
}

export const ScreenGateDashboard: React.FC<Props> = ({
  flight,
  onShowRoute,
  onOpenFlightUpdates,
  onTalkWithStaff,
  onChangeFlight,
  onTriggerEventScenario,
  commMode,
  textLanguage,
  highContrast = false,
}) => {
  const [events, setEvents] = useState(false);
  const fr = textLanguage === 'fr' || commMode === 'lsq';
  const es = textLanguage === 'es' && commMode === 'text';
  const delayed = flight.status === 'Delayed';
  const gatePhoto = getGatePhoto(flight.airline);
  const gateWord = fr ? 'Porte' : es ? 'Puerta' : 'Gate';
  const caption = commMode === 'lsq'
    ? lsqMedia('4.1').fr
    : `Go to Gate ${flight.gate} and wait in the gate area.`;

  return (
    <div className="max-w-lg mx-auto w-full py-3 space-y-3">
      {commMode !== 'text' && (
        <SignLanguagePlayer
          commMode={commMode}
          title={commMode === 'lsq' ? 'LSQ 4.1 · Porte d’embarquement' : 'Gate information'}
          captionText={caption}
          videoSrc={signMedia('4.1', commMode === 'lsq' ? 'lsq' : 'asl').src}
          announcementCode={'4.1'}
          presentationMode
          autoPlay
          autoPlayDelayMs={900}
          loop
          hideControls
          sticky
          highContrast={highContrast}
        />
      )}

      <section className={`ys-card overflow-hidden ${highContrast ? '!bg-black !border-white' : ''}`}>
        <div className="p-4 flex items-center gap-3 border-b border-[#edf0f2]">
          <AirlineLogo airline={flight.airline} />
          <div className="min-w-0 flex-1">
            <div className="text-[0.75rem] uppercase tracking-wider font-extrabold text-[#65717c]">{flight.flightNumber}</div>
            <div className="text-xl font-black text-[#062a4d] truncate">{flight.destination}</div>
          </div>
          <span className={`ys-chip ykf-flight-status ${delayed ? 'bg-[#fff0d9] text-[#8c5100]' : 'bg-[#e6f5ec] text-[#1b6b45]'}`}>
            {flightStatusLabel(flight.status, textLanguage)}
          </span>
        </div>

        <div className="grid grid-cols-[0.92fr_1.08fr] min-h-[190px]">
          <div className="p-4 flex flex-col justify-between border-r border-[#edf0f2]">
            <div>
              <div className="ys-kicker">{fr ? 'Porte d’embarquement' : es ? 'Puerta de embarque' : 'Departure gate'}</div>
              <div className="text-[4.375rem] leading-none font-black tracking-[-.05em] text-[#062a4d] mt-1">{flight.gate}</div>
            </div>
            <div className="mt-3">
              <div className="text-[0.75rem] uppercase font-bold text-[#7a858e]">{fr ? 'Départ' : es ? 'Salida' : 'Departure'}</div>
              <div className="font-black text-[#062a4d] text-lg">{flight.departureTime}</div>
              <div className="mt-1 text-[0.75rem] text-[#65717c] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {fr ? 'Mise à jour' : es ? 'Actualizado' : 'Updated'} {flight.lastUpdated}
              </div>
            </div>
          </div>
          <div className="bg-[#eaf1f5] flex flex-col">
            <YkfReferencePhoto
              src={gatePhoto.src}
              alt={fr ? gatePhoto.altFr : gatePhoto.altEn}
              label={fr ? gatePhoto.labelFr : gatePhoto.labelEn}
              className="min-h-[158px] flex-1"
              objectPosition="center 48%"
              overlay={false}
            />
            <div className="px-3 py-2 text-[0.75rem] font-bold text-[#52606c] bg-white border-t border-[#edf0f2]">
              {fr ? gatePhoto.labelFr : gatePhoto.labelEn}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-[#edf0f2]">
          <button onClick={onShowRoute} className="ys-primary ykf-route-cta w-full h-12 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition active:scale-[.98]">
            <Navigation className="w-4 h-4" />
            {fr ? `Trajet vers la porte ${flight.gate}` : es ? `Ruta a la puerta ${flight.gate}` : `Route to Gate ${flight.gate}`}
          </button>
        </div>
      </section>

      {commMode === 'text' && (
        <div className="rounded-2xl border border-[#b9e5e2] bg-[#eefbfa] p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#087f7b] mt-0.5 shrink-0" />
          <div>
            <div className="text-xs font-black text-[#062a4d]">{gateWord} {flight.gate}</div>
            <div className="text-[0.75rem] text-[#59636e] mt-0.5">{jt(textLanguage, 'gateWait')}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <button onClick={onShowRoute} className="ys-card ykf-interactive-card p-3 min-h-[96px] flex flex-col items-start justify-between text-left transition active:scale-[.98]">
          <div className="ykf-action-icon ykf-action-icon-route w-9 h-9 rounded-xl bg-[#dff7f5] text-[#087f7b] flex items-center justify-center"><Navigation className="w-5 h-5" /></div>
          <div><div className="font-black text-[#062a4d] text-sm">{fr ? 'Trajet' : es ? 'Ruta' : 'Route'}</div><div className="text-[0.75rem] text-[#65717c]">{fr ? 'Vers la porte' : es ? 'A la puerta' : 'To gate'}</div></div>
        </button>
        <button onClick={onOpenFlightUpdates} className="ys-card ykf-interactive-card p-3 min-h-[96px] flex flex-col items-start justify-between text-left transition active:scale-[.98]">
          <div className="ykf-action-icon ykf-action-icon-updates w-9 h-9 rounded-xl bg-[#eef2ff] text-[#374a8c] flex items-center justify-center"><Bell className="w-5 h-5" /></div>
          <div><div className="font-black text-[#062a4d] text-sm">{fr ? 'Alertes' : es ? 'Alertas' : 'Updates'}</div><div className="text-[0.75rem] text-[#65717c]">{fr ? 'Exemples de démo' : es ? 'Ejemplos de demo' : 'Demo examples'}</div></div>
        </button>
        <button onClick={onTalkWithStaff} className="ys-card ykf-interactive-card p-3 min-h-[96px] flex flex-col items-start justify-between text-left transition active:scale-[.98]">
          <div className="ykf-action-icon ykf-action-icon-staff w-9 h-9 rounded-xl bg-[#f2edf8] text-[#68458c] flex items-center justify-center"><MessageSquare className="w-5 h-5" /></div>
          <div><div className="font-black text-[#062a4d] text-sm">{fr ? 'Personnel' : es ? 'Personal' : 'Staff'}</div><div className="text-[0.75rem] text-[#65717c]">{fr ? 'Écrire un message' : es ? 'Escribir mensaje' : 'Type a message'}</div></div>
        </button>
      </div>

      <button onClick={onChangeFlight} className="w-full h-11 rounded-2xl text-sm font-bold text-[#59636e] flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4" />
        {fr ? 'Changer de vol' : es ? 'Cambiar vuelo' : 'Change flight'}
      </button>

      <section className="ykf-demo-event-card rounded-2xl border border-dashed border-[#b8c5cf] bg-[#f9fbfc] p-3">
        <button aria-expanded={events} onClick={() => setEvents(!events)} className="w-full flex items-center justify-between">
          <span className="flex items-center gap-2 text-[0.75rem] uppercase tracking-wider font-black text-[#526a79]">
            <Sparkles className="w-4 h-4 text-[#087f7b]" />
            {jt(textLanguage, 'simulatedEvent')}
          </span>
          <ChevronRight className={`w-4 h-4 transition ${events ? 'rotate-90' : ''}`} />
        </button>
        {events && (
          <>
            <div className="mt-2 text-[0.75rem] text-[#7a858e]">{jt(textLanguage, 'liveDataPending')}</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                ['gate_change', fr ? 'Changement de porte' : es ? 'Cambio de puerta' : 'Gate change', 'bg-[#ffe5e2] text-[#9f261c]'],
                ['boarding', fr ? 'Embarquement' : es ? 'Embarque' : 'Boarding', 'bg-[#e8f0f8] text-[#163e62]'],
                ['delay', fr ? 'Retard' : es ? 'Retraso' : 'Delay', 'bg-[#fff0d9] text-[#8c5100]'],
                ['final_call', fr ? 'Dernier appel' : es ? 'Última llamada' : 'Final call', 'bg-[#b42318] text-white'],
                ['cancellation', fr ? 'Annulé' : es ? 'Cancelado' : 'Cancelled', 'bg-[#3f4750] text-white'],
                ['paging', fr ? 'Appel passager' : es ? 'Aviso a pasajero' : 'Passenger page', 'bg-[#efe7f5] text-[#68458c]'],
              ].map(([key, label, className]) => (
                <button key={key} onClick={() => onTriggerEventScenario(key)} className={`rounded-xl p-2.5 text-[0.75rem] font-black text-left ${className}`}>{label}</button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};
