import React, { useMemo, useState } from 'react';
import { ShieldCheck, ArrowRight, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { CommunicationMode, TextLanguageCode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';
import { t } from '../data/i18n';
import { jt } from '../data/textJourneyCopy';
import { lsqMedia, signMedia } from '../data/announcementMedia';
import { YkfReferencePhoto } from '../components/YkfReferencePhoto';
import { YKF_MEDIA } from '../data/ykfMedia';

interface Props {
  onContinue: () => void;
  onOpenHelp: () => void;
  commMode: CommunicationMode;
  textLanguage: TextLanguageCode;
  highContrast?: boolean;
}

const CODES = ['3.1', '3.2.a', '3.5', '3.6', '3.8'];

export const ScreenCatsaSecurity: React.FC<Props> = ({
  onContinue,
  onOpenHelp,
  commMode,
  textLanguage,
  highContrast = false,
}) => {
  const [index, setIndex] = useState(0);
  const media = useMemo(() => lsqMedia(CODES[index]), [index]);
  const fr = textLanguage === 'fr' || commMode === 'lsq';
  const es = textLanguage === 'es' && commMode === 'text';

  const goPrevious = () => setIndex((value) => Math.max(0, value - 1));
  const goNext = () => setIndex((value) => Math.min(CODES.length - 1, value + 1));
  const autoAdvance = () => {
    if (index < CODES.length - 1) {
      window.setTimeout(() => setIndex((value) => Math.min(CODES.length - 1, value + 1)), 650);
    }
  };

  const textSteps = CODES.map((code) => {
    const item = lsqMedia(code);
    return {
      code,
      body: fr ? item.fr : item.en,
    };
  });

  return (
    <div className="max-w-lg mx-auto w-full py-3 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#062a4d] text-white flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="ys-kicker">{fr ? 'Étape suivante' : es ? 'Siguiente etapa' : 'Next stage'}</div>
          <h1 className="text-[1.625rem] leading-tight font-black text-[#062a4d]">{t(textLanguage, 'security')}</h1>
        </div>
      </div>

      {commMode !== 'text' && (
        <>
          <SignLanguagePlayer
            commMode={commMode}
            title={commMode === 'lsq' ? `LSQ ${media.code} · Sécurité` : 'Security screening'}
            captionText={commMode === 'lsq' ? media.fr : media.en}
            videoSrc={signMedia(media.code, commMode === 'lsq' ? 'lsq' : 'asl').src}
            announcementCode={media.code}
            presentationMode
            autoPlay
            autoPlayDelayMs={700}
            hideControls
            sticky
            highContrast={highContrast}
            onEnded={autoAdvance}
          />

          <div className="ys-card p-3">
            <div className="flex items-center gap-2">
              <button
                disabled={index === 0}
                onClick={goPrevious}
                aria-label={fr ? 'Instruction précédente' : 'Previous instruction'}
                className="w-11 h-11 rounded-xl border border-[#dce3e8] flex items-center justify-center disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 text-center">
                <div className="text-sm font-black text-[#062a4d]">{index + 1} / {CODES.length}</div>
                <div className="text-[0.75rem] text-[#65717c]">{fr ? 'Instruction' : 'Instruction'} {media.code}</div>
              </div>
              <button
                disabled={index === CODES.length - 1}
                onClick={goNext}
                aria-label={fr ? 'Instruction suivante' : 'Next instruction'}
                className="w-11 h-11 rounded-xl border border-[#dce3e8] flex items-center justify-center disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 flex justify-center gap-1">
              {CODES.map((code, itemIndex) => {
                const active = itemIndex === index;
                return (
                  <button
                    key={code}
                    onClick={() => setIndex(itemIndex)}
                    className="ykf-photo-dot rounded-full transition-all"
                    aria-label={`Security step ${itemIndex + 1}`}
                    aria-pressed={active}
                  >
                    <span className={`block rounded-full transition-all ${active ? 'h-2 w-4 bg-[#087f7b]' : 'h-2 w-2 bg-[#cfd8de]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <section className="ys-card overflow-hidden">
            <YkfReferencePhoto
              src={YKF_MEDIA.catsa.src}
              alt={fr ? YKF_MEDIA.catsa.altFr : YKF_MEDIA.catsa.altEn}
              label={fr ? YKF_MEDIA.catsa.labelFr : YKF_MEDIA.catsa.labelEn}
              className="h-[220px] sm:h-[250px]"
              objectPosition="center 48%"
            />
          </section>
        </>
      )}

      {commMode === 'text' && (
        <>
          <section className="ys-card overflow-hidden">
            <YkfReferencePhoto
              src={YKF_MEDIA.catsa.src}
              alt={fr ? YKF_MEDIA.catsa.altFr : YKF_MEDIA.catsa.altEn}
              label={fr ? YKF_MEDIA.catsa.labelFr : YKF_MEDIA.catsa.labelEn}
              className="h-[220px] sm:h-[250px]"
              objectPosition="center 48%"
            />
          </section>
          <section className="ys-card p-4">
            <div className="ys-kicker mb-2">{jt(textLanguage, 'textJourney')}</div>
            <div className="grid gap-2">
              {textSteps.map(({ code, body }, itemIndex) => (
                <div key={code} className="rounded-2xl border border-[#e1e7eb] bg-[#fbfcfd] p-3 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#062a4d] text-white flex items-center justify-center shrink-0 text-xs font-black">
                    {itemIndex + 1}
                  </div>
                  <div className="text-sm leading-snug font-semibold text-[#34424f]">{body}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <div className="rounded-2xl bg-[#fff7e8] border border-[#f1d7a7] px-4 py-2.5 text-[0.75rem] text-[#775006]">
        {jt(textLanguage, 'securityNote')}
      </div>

      <button onClick={onContinue} className="ys-primary w-full flex items-center justify-center gap-2">
        <span>{fr ? 'Continuer vers la porte' : es ? 'Continuar a la puerta' : 'Continue to gate'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
      <button onClick={onOpenHelp} className="w-full h-11 text-sm font-bold text-[#087f7b] flex items-center justify-center gap-2">
        <HelpCircle className="w-4 h-4" />
        {fr ? 'Besoin d’aide?' : es ? '¿Necesitas ayuda?' : 'Need help?'}
      </button>
    </div>
  );
};
