import { AccessibleDialog } from '../components/AccessibleDialog';
import { flightStatusLabel } from '../data/flightStatusLabel';
import React, { useState } from 'react';
import { Bell, BellRing, CheckCircle2, Clock, Search, ArrowRight, Info, X, ExternalLink, Radio } from 'lucide-react';
import { Flight, CommunicationMode, TextLanguageCode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';
import { AirlineLogo } from '../components/AirlineLogo';
import { YkfPhotoCarousel } from '../components/YkfPhotoCarousel';
import { YKF_MEDIA } from '../data/ykfMedia';
import { t } from '../data/i18n';
import { jt } from '../data/textJourneyCopy';
import { lsqMedia, signMedia } from '../data/announcementMedia';
import { useFlightFeed } from '../hooks/useFlightFeed';
import { getOfficialFlightStatusUrl } from '../data/flightStatusLinks';

export type NotificationStatus = 'off' | 'enabled' | 'ios_install_required' | 'denied' | 'unsupported';
interface Props {
  selectedFlight: Flight;
  onSelectFlight: (flight: Flight) => void;
  onConfirm: () => void;
  commMode: CommunicationMode;
  textLanguage: TextLanguageCode;
  notificationsEnabled: boolean;
  notificationStatus: NotificationStatus;
  onEnableNotifications: () => void;
  highContrast?: boolean;
}

export const ScreenFlightSelection: React.FC<Props> = ({
  onSelectFlight,
  onConfirm,
  commMode,
  textLanguage,
  notificationsEnabled,
  notificationStatus,
  onEnableNotifications,
}) => {
  const [active, setActive] = useState<Flight | null>(null);
  const [notListed, setNotListed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fr = textLanguage === 'fr' || commMode === 'lsq';
  const es = textLanguage === 'es' && commMode === 'text';
  const { flights, mode: flightFeedMode, loading: flightFeedLoading, error: feedError } = useFlightFeed();

  const choose = (flight: Flight) => {
    setActive(flight);
    setShowConfirm(true);
  };

  return (
    <div className="max-w-lg mx-auto w-full py-3 space-y-3">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="ys-kicker">{fr ? 'Départs' : es ? 'Salidas' : 'YKF departures'}</div>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[0.75rem] font-black uppercase tracking-wide ${flightFeedMode === 'live' ? 'bg-[#e6f5ec] text-[#1b6b45]' : 'bg-[#fff0d9] text-[#8c5100]'}`}>
            <Radio className="w-3 h-3" />
            {flightFeedLoading ? (fr ? 'Connexion…' : 'Connecting…') : flightFeedMode === 'live' ? (fr ? 'Données en direct' : 'Live data') : (fr ? 'Données de démo' : 'Demo data')}
          </span>
        </div>
        <h1 className="text-[1.5625rem] sm:text-[1.75rem] leading-[1.05] font-black tracking-tight text-[#062a4d] mt-1">
          {t(textLanguage, 'flightTitle')}
        </h1>
      </div>

      {commMode !== 'text' && (
        <SignLanguagePlayer
          commMode={commMode}
          title={commMode === 'lsq' ? 'LSQ 1 · Sélection du vol' : 'Choose your flight'}
          captionText={commMode === 'lsq' ? lsqMedia('1').fr : t(textLanguage, 'flightSubtitle')}
          videoSrc={signMedia('1', commMode === 'lsq' ? 'lsq' : 'asl').src}
          announcementCode={'1'}
          presentationMode
          autoPlay
          autoPlayDelayMs={1200}
          loop
          hideControls
          sticky
        />
      )}

      {commMode === 'text' && (
        <div className="rounded-2xl border border-[#b9e5e2] bg-[#eefbfa] p-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#087f7b] mt-0.5 shrink-0" />
          <div className="text-[0.75rem] font-semibold text-[#59636e]">{jt(textLanguage, 'chooseFlightHint')}</div>
        </div>
      )}

      {/* Same real YKF visual references in Sign and Text modes. */}
      <YkfPhotoCarousel
        photos={[YKF_MEDIA.kioskAll, YKF_MEDIA.lobbyKiosks, YKF_MEDIA.checkinCounters]}
        language={textLanguage}
        title={jt(textLanguage, 'kioskPhotos')}
        note={fr ? 'Diaporama automatique · balayez si vous voulez.' : es ? 'Presentación automática · desliza si quieres.' : 'Automatic slideshow · swipe if you want.'}
        autoAdvance
        intervalMs={1500}
      />



      {feedError && <p role="status" className="text-sm">{fr ? 'Connexion indisponible. Vols de démonstration affichés.' : es ? 'Sin conexión. Se muestran vuelos de demostración.' : 'Connection unavailable. Showing demonstration flights.'}</p>}
      {!flightFeedLoading && !flights.length && <p role="status">{fr ? 'Aucun départ disponible.' : es ? 'No hay salidas disponibles.' : 'No departures available.'}</p>}
      <section aria-label={fr ? 'Liste des vols' : es ? 'Lista de vuelos' : 'Flight list'}>
        <div className="space-y-2">
          {flights.map((flight) => {
            const selected = active?.id === flight.id;
            const delayed = flight.status === 'Delayed';
            return (
              <button
                key={flight.id}
                aria-pressed={selected}
                onClick={() => choose(flight)}
                className={`w-full ys-card p-3.5 text-left flex items-center gap-3 transition ${
                  selected ? '!border-[#087f7b] ring-4 ring-[#bceeea]/50 bg-[#fbffff]' : 'active:scale-[.99]'
                }`}
              >
                <AirlineLogo airline={flight.airline} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start flex-wrap gap-2">
                    <h2 className="text-xl font-black text-[#062a4d] break-words">{flight.destination}</h2>
                    <span className={`ys-chip ykf-flight-status ml-auto shrink-0 ${delayed ? 'bg-[#fff0d9] text-[#8c5100]' : 'bg-[#e6f5ec] text-[#1b6b45]'}`}>
                      {flightStatusLabel(flight.status, textLanguage)}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[0.75rem] text-[#65717c]">
                    <span className="font-bold text-[#34424f]">{flight.flightNumber}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{flight.departureTime}</span>
                    <span className="ml-auto font-bold text-[#062a4d]">
                      {fr ? 'Porte' : es ? 'Puerta' : 'Gate'} {flight.gate}
                    </span>
                  </div>
                </div>
                {selected && <CheckCircle2 className="w-5 h-5 text-[#087f7b] shrink-0" />}
              </button>
            );
          })}
        </div>
      </section>

      <div className="ys-card p-3.5 flex items-center gap-3">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${notificationsEnabled ? 'bg-[#dff7f5] text-[#087f7b]' : 'bg-[#eef2f5] text-[#52606c]'}`}>
          {notificationsEnabled ? <BellRing className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
        </div>
        <div className="flex-1">
          <div className="font-black text-[#062a4d] text-sm">{fr ? 'Notification de test' : es ? 'Notificación de prueba' : 'Test notification'}</div>
          <div className="text-[0.75rem] text-[#65717c] leading-snug">{fr ? 'Démo uniquement. Aucune alerte de vol automatique.' : es ? 'Solo demo. Sin alertas de vuelo automáticas.' : 'Demo only. No automatic flight alerts.'}</div>
          {['denied', 'unsupported'].includes(notificationStatus) && <p role="status" className="text-sm mt-1">{fr ? 'Notification indisponible. Vérifiez les autorisations du navigateur et utilisez HTTPS.' : es ? 'Notificación no disponible. Revisa los permisos del navegador y usa HTTPS.' : 'Notification unavailable. Check browser permissions and use HTTPS.'}</p>}
          {notificationStatus === 'ios_install_required' && (
            <div className="text-[0.75rem] font-bold text-[#8c5100] mt-1">
              {fr ? 'iPhone : ajoutez d’abord cette app à l’écran d’accueil.' : es ? 'iPhone: primero añade esta app a la pantalla de inicio.' : 'iPhone: add this web app to Home Screen first.'}
            </div>
          )}
        </div>
        <button
          onClick={onEnableNotifications}
          className={`px-3 py-2.5 rounded-xl text-[0.75rem] font-black ${notificationsEnabled ? 'bg-[#dff7f5] text-[#087f7b]' : 'bg-[#062a4d] text-white'}`}
        >
          {fr ? 'Tester' : es ? 'Probar' : 'Test'}
        </button>
      </div>

      <button onClick={() => setNotListed(!notListed)} aria-expanded={notListed} className="ys-secondary w-full flex items-center justify-center gap-2">
        <Search className="w-5 h-5" />
        {t(textLanguage, 'flightNotListed')}
      </button>

      {notListed && <p role="status" className="ys-card p-4">{fr ? 'Vérifiez le numéro sur votre carte d’embarquement et demandez au personnel. Les vols de démo ne représentent pas tous les départs.' : es ? 'Comprueba tu tarjeta de embarque y consulta al personal. La lista de demo no incluye todas las salidas.' : 'Check your boarding pass and ask airline staff. The demo list does not include all departures.'}</p>}
      {active && showConfirm && (
        <AccessibleDialog onClose={() => setShowConfirm(false)} label={fr ? 'Confirmer le vol' : 'Confirm flight'}>
          <div className="w-full max-w-lg ys-card p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <AirlineLogo airline={active.airline} />
              <div className="flex-1 min-w-0">
                <div className="ys-kicker">{fr ? 'Confirmer votre vol' : es ? 'Confirma tu vuelo' : 'Confirm your flight'}</div>
                <div className="text-2xl font-black text-[#062a4d] truncate">{active.destination}</div>
                <div className="mt-1 text-sm font-semibold text-[#59636e]">
                  {active.flightNumber} · {active.departureTime} · {fr ? 'Porte' : es ? 'Puerta' : 'Gate'} {active.gate}
                </div>
              </div>
              <button onClick={() => setShowConfirm(false)} className="w-10 h-10 rounded-full bg-[#f1f4f6] flex items-center justify-center" aria-label={fr ? "Fermer" : es ? "Cerrar" : "Close"}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <a
              href={getOfficialFlightStatusUrl(active.airline)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full rounded-xl border border-[#b9c7d2] bg-white text-[#062a4d] font-black text-sm min-h-11 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              {fr ? 'Vérifier le statut officiel du vol' : es ? 'Ver estado oficial del vuelo' : 'Check official flight status'}
            </a>
            <button
              onClick={() => { onSelectFlight(active); onConfirm(); }}
              className="ys-primary w-full mt-2 flex items-center justify-center gap-2"
            >
              <span>{fr ? 'Confirmer et continuer' : es ? 'Confirmar y continuar' : 'Confirm and continue'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </AccessibleDialog>
      )}
    </div>
  );
};
