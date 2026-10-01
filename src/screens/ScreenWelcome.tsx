import React, { useState } from 'react';
import { ArrowRight, FileText, Hand, HelpCircle, CheckCircle2, Waypoints } from 'lucide-react';
import { CommunicationMode, SignLanguageCode, TextLanguageCode } from '../types';
import { SIGN_LANGUAGE_OPTIONS, TEXT_LANGUAGE_OPTIONS } from '../data/languages';
import { t } from '../data/i18n';
import { jt } from '../data/textJourneyCopy';
import { YKF_MEDIA } from '../data/ykfMedia';
import { YkfPhotoCarousel } from '../components/YkfPhotoCarousel';

interface Props {
  onContinue: () => void;
  onOpenVisualJourney: () => void;
  onOpenHelp: () => void;
  commMode: CommunicationMode;
  onCommModeChange: (mode: CommunicationMode) => void;
  textLanguage: TextLanguageCode;
  onTextLanguageChange: (language: TextLanguageCode) => void;
  highContrast?: boolean;
}

export const ScreenWelcome: React.FC<Props> = ({
  onContinue,
  onOpenVisualJourney,
  onOpenHelp,
  commMode,
  onCommModeChange,
  textLanguage,
  onTextLanguageChange,
  highContrast = false,
}) => {
  const [choice, setChoice] = useState<'sign' | 'text'>(commMode === 'text' ? 'text' : 'sign');
  const selectedSign: SignLanguageCode = commMode === 'lsq' ? 'lsq' : 'asl';
  const fr = textLanguage === 'fr' || commMode === 'lsq';
  const es = textLanguage === 'es' && commMode === 'text';

  const chooseSign = (code?: SignLanguageCode) => {
    setChoice('sign');
    onCommModeChange(code || selectedSign);
  };
  const chooseText = () => {
    setChoice('text');
    onCommModeChange('text');
  };

  const signName = (code: SignLanguageCode) => {
    if (code === 'asl') return fr ? 'Langue des signes américaine' : es ? 'Lengua de señas estadounidense' : 'American Sign Language';
    return fr ? 'Langue des signes québécoise' : es ? 'Lengua de señas de Quebec' : 'Quebec Sign Language';
  };

  return (
    <div className="max-w-lg mx-auto w-full py-3">
      <section className={`ys-card p-5 sm:p-6 ${highContrast ? '!bg-black !text-white !border-white' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <img src="/assets/ykf/official/region-waterloo-logo.png" alt="Region of Waterloo official logo" className="h-12 w-16 object-contain shrink-0" />
          <div className="min-w-0">
            <div className={`font-black text-[0.9375rem] leading-tight ${highContrast ? 'text-white' : 'text-[#062a4d]'}`}>Region of Waterloo International Airport</div>
            <div className={`text-[0.75rem] uppercase tracking-wider font-bold ${highContrast ? 'text-yellow-300' : 'text-[#65717c]'}`}>YKF · Accessibility</div>
          </div>
        </div>

        <h1 className={`text-[1.8125rem] sm:text-[2.0rem] leading-[1.04] font-black tracking-tight ${highContrast ? 'text-white' : 'text-[#062a4d]'}`}>{t(textLanguage, 'welcomeTitle')}</h1>

        <div className="ykf-choice-grid grid grid-cols-2 gap-3 mt-5">
          <button
            aria-pressed={choice === "sign"} onClick={() => chooseSign()}
            className={`rounded-[22px] p-4 border-2 text-left min-h-[132px] transition ${choice === 'sign' ? 'border-[#087f7b] bg-[#e9fbf9] shadow-[0_0_0_4px_rgba(8,127,123,.08)]' : 'border-[#dce3e8] bg-white'}`}
          >
            <div className="w-11 h-11 rounded-xl bg-[#062a4d] text-white flex items-center justify-center"><Hand className="w-6 h-6" /></div>
            <div className="mt-3 font-black text-[#062a4d] leading-tight">{t(textLanguage, 'signLanguage')}</div>
            <div className="mt-1 text-[0.75rem] text-[#5d6872]">ASL · LSQ</div>
          </button>

          <button
            aria-pressed={choice === "text"} onClick={chooseText}
            className={`rounded-[22px] p-4 border-2 text-left min-h-[132px] transition ${choice === 'text' ? 'border-[#087f7b] bg-[#e9fbf9] shadow-[0_0_0_4px_rgba(8,127,123,.08)]' : 'border-[#dce3e8] bg-white'}`}
          >
            <div className="w-11 h-11 rounded-xl bg-[#062a4d] text-white flex items-center justify-center"><FileText className="w-6 h-6" /></div>
            <div className="mt-3 font-black text-[#062a4d] leading-tight">{t(textLanguage, 'textOnly')}</div>
            <div className="mt-1 text-[0.75rem] text-[#5d6872]">English · Français · Español</div>
          </button>
        </div>

        {choice === 'sign' ? (
          <div className="mt-5">
            <div className="ykf-sign-grid grid grid-cols-2 gap-2">
              {SIGN_LANGUAGE_OPTIONS.map((lang) => {
                const selected = selectedSign === lang.code;
                return (
                  <button
                    key={lang.code} aria-pressed={selectedSign === lang.code}
                    onClick={() => chooseSign(lang.code)}
                    className={`rounded-2xl border p-3 flex items-center gap-2 text-left min-h-[82px] ${selected ? 'border-[#087f7b] bg-[#dff7f5]' : 'border-[#dce3e8] bg-[#fbfcfd]'}`}
                  >
                    <span className={`w-11 h-11 rounded-xl flex items-center justify-center text-[1.35rem] shrink-0 ${selected ? 'bg-[#087f7b]' : 'bg-[#edf4f7]'}`} aria-hidden="true">{lang.flag}</span>
                    <div className="min-w-0">
                      <div className="font-black text-[#062a4d] text-[0.8125rem] leading-tight">{lang.shortLabel}</div>
                      <div className="text-[0.7rem] text-[#65717c] leading-tight mt-0.5">{signName(lang.code)}</div>
                    </div>
                    {selected && <CheckCircle2 className="w-4 h-4 text-[#087f7b] ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl bg-[#f5f8fa] border border-[#dce3e8] p-3">
            <div className="ys-kicker mb-2">{t(textLanguage, 'textLanguage')}</div>
            <div className="ykf-textlang-grid grid grid-cols-3 gap-2">
              {TEXT_LANGUAGE_OPTIONS.map((lang) => (
                <button
                  key={lang.code} aria-pressed={textLanguage === lang.code}
                  onClick={() => onTextLanguageChange(lang.code)}
                  className={`rounded-xl border p-2 text-center ${textLanguage === lang.code ? 'bg-[#062a4d] text-white border-[#062a4d]' : 'bg-white text-[#062a4d] border-[#dce3e8]'}`}
                >
                  <span className="text-lg block">{lang.flag}</span>
                  <span className="text-[0.75rem] font-bold">{lang.nativeLabel}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keep the same real YKF visual landmarks in both Sign and Text modes. */}
        <div className="mt-4">
          <YkfPhotoCarousel
            photos={[YKF_MEDIA.entrance, YKF_MEDIA.terminalBuilding]}
            language={textLanguage}
            title={fr ? 'Entrée YKF' : es ? 'Entrada de YKF' : 'YKF entrance'}
            note={fr ? 'Repérez ces lieux à votre arrivée.' : es ? 'Busca estos lugares al llegar.' : 'Look for these landmarks when you arrive.'}
            autoAdvance
            intervalMs={1500}
          />
        </div>

        <button onClick={onContinue} className="ys-primary w-full mt-5 flex items-center justify-center gap-2">
          <span>{t(textLanguage, 'continueFlight')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <button onClick={onOpenVisualJourney} className="ys-secondary w-full mt-2 flex items-center justify-center gap-2">
          <Waypoints className="w-4 h-4" />
          {jt(textLanguage, 'visualJourney')}
        </button>
        <button onClick={onOpenHelp} className="w-full mt-2 h-11 text-sm font-bold text-[#087f7b] flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4" />
          {fr ? 'Besoin d’aide?' : es ? '¿Necesitas ayuda?' : 'Need help?'}
        </button>
      </section>
    </div>
  );
};
