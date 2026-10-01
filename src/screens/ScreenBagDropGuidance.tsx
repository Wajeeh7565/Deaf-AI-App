import React from 'react';
import { Luggage, ShieldCheck, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { Flight, CommunicationMode, TextLanguageCode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';
import { AirlineLogo } from '../components/AirlineLogo';
import { YkfPhotoCarousel } from '../components/YkfPhotoCarousel';
import { t } from '../data/i18n';
import { jt } from '../data/textJourneyCopy';
import { lsqMedia, signMedia } from '../data/announcementMedia';
import { getBagDropGallery } from '../data/ykfMedia';

interface Props {
  flight: Flight;
  onPrevious: () => void;
  onNext: () => void;
  onOpenHelp: () => void;
  commMode: CommunicationMode;
  textLanguage: TextLanguageCode;
  highContrast?: boolean;
}

export const ScreenBagDropGuidance: React.FC<Props> = ({
  flight,
  onPrevious,
  onNext,
  onOpenHelp,
  commMode,
  textLanguage,
  highContrast = false,
}) => {
  const fr = textLanguage === 'fr' || commMode === 'lsq';
  const es = textLanguage === 'es' && commMode === 'text';
  const photos = getBagDropGallery(flight.airline);
  const caption = commMode === 'lsq'
    ? lsqMedia('2').fr
    : 'If you have a checked bag, go to your airline check-in and bag-drop area. If not, continue to security.';

  return (
    <div className="max-w-lg mx-auto w-full py-3 space-y-3">
      <div className="flex items-center gap-3">
        <AirlineLogo airline={flight.airline} />
        <div>
          <div className="ys-kicker">{fr ? 'Avant la sécurité' : es ? 'Antes de seguridad' : 'Before security'}</div>
          <h1 className={`text-2xl font-black ${highContrast ? 'text-white' : 'text-[#062a4d]'}`}>
            {fr ? 'Bagages et sécurité' : es ? 'Equipaje y seguridad' : 'Baggage & security'}
          </h1>
        </div>
      </div>

      {commMode !== 'text' && (
        <SignLanguagePlayer
          commMode={commMode}
          title={commMode === 'lsq' ? 'LSQ 2 · Bagages et sécurité' : 'Baggage & security'}
          captionText={caption}
          videoSrc={signMedia('2', commMode === 'lsq' ? 'lsq' : 'asl').src}
          announcementCode={'2'}
          presentationMode
          autoPlay
          autoPlayDelayMs={1200}
          loop
          hideControls
          sticky
          highContrast={highContrast}
        />
      )}

      <YkfPhotoCarousel
        photos={photos}
        language={textLanguage}
        title={fr ? 'Repères publics à YKF' : es ? 'Puntos de referencia públicos en YKF' : 'Public YKF landmarks'}
        note={fr ? 'Diaporama automatique. Balayez ou utilisez les flèches.' : es ? 'Presentación automática. Desliza o usa las flechas.' : 'Automatic slideshow. Swipe or use the arrows.'}
        autoAdvance
        intervalMs={1500}
        large
      />

      <section className={`ys-card p-3 ${highContrast ? '!bg-black !border-white' : ''}`}>
        <div className="grid gap-2.5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#062a4d] text-white flex items-center justify-center shrink-0">
              <Luggage className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-black ${highContrast ? 'text-white' : 'text-[#062a4d]'}`}>
                {fr ? 'Si vous avez un bagage enregistré' : es ? 'Si tienes equipaje facturado' : 'If you have a checked bag'}
              </div>
              <div className={`text-[0.8125rem] leading-snug mt-0.5 ${highContrast ? 'text-white' : 'text-[#59636e]'}`}>
                {fr ? `Suivez les repères ${flight.airline} vers l’enregistrement et le dépôt des bagages.` : es ? `Sigue las señales de ${flight.airline} hacia facturación y entrega de equipaje.` : `Follow ${flight.airline} signs to check-in and bag drop.`}
              </div>
            </div>
          </div>
          <div className="h-px bg-[#edf0f2]" />
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dff7f5] text-[#087f7b] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-black ${highContrast ? 'text-white' : 'text-[#062a4d]'}`}>
                {fr ? 'Si vous n’avez pas de bagage enregistré' : es ? 'Si no tienes equipaje facturado' : 'If you do not have a checked bag'}
              </div>
              <div className={`text-[0.8125rem] leading-snug mt-0.5 ${highContrast ? 'text-white' : 'text-[#59636e]'}`}>
                {fr ? 'Passez directement au contrôle de sécurité.' : es ? 'Continúa directamente al control de seguridad.' : 'Continue directly to security screening.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          aria-label={fr ? 'Retour aux vols' : es ? 'Volver a vuelos' : 'Back to flights'}
          className="w-14 h-14 rounded-2xl border border-[#dce3e8] bg-white flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onOpenHelp}
          aria-label={fr ? 'Aide' : es ? 'Ayuda' : 'Help'}
          className="w-14 h-14 rounded-2xl border border-[#dce3e8] bg-white flex items-center justify-center"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        <button onClick={onNext} className="ys-primary flex-1 px-4 flex items-center justify-center gap-2">
          <span>{t(textLanguage, 'security')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
