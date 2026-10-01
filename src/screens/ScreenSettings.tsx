import React from 'react';
import { Languages, Type, Moon, Plane, RotateCcw, HelpCircle, QrCode, MonitorSmartphone, ChevronDown } from 'lucide-react';
import { CommunicationMode, Flight, SignLanguageCode, TextLanguageCode } from '../types';
import { SIGN_LANGUAGE_OPTIONS, TEXT_LANGUAGE_OPTIONS, getSignLanguage } from '../data/languages';

interface Props {
  commMode: CommunicationMode;
  onCommModeChange: (mode: CommunicationMode) => void;
  textLanguage: TextLanguageCode;
  onTextLanguageChange: (lang: TextLanguageCode) => void;
  textSize: 'normal' | 'large' | 'xlarge';
  onTextSizeChange: (s: 'normal' | 'large' | 'xlarge') => void;
  nightMode: boolean;
  onNightModeToggle: () => void;
  selectedFlight: Flight;
  onChangeFlight: () => void;
  onReplayIntro: () => void;
  onOpenHelp: () => void;
  onShowQrCodes: () => void;
  onSimulateTerminalQr: () => void;
}

export const ScreenSettings: React.FC<Props> = ({
  commMode,
  onCommModeChange,
  textLanguage,
  onTextLanguageChange,
  textSize,
  onTextSizeChange,
  nightMode,
  onNightModeToggle,
  selectedFlight,
  onChangeFlight,
  onReplayIntro,
  onOpenHelp,
  onShowQrCodes,
  onSimulateTerminalQr,
}) => {
  const fr = textLanguage === 'fr' || commMode === 'lsq';
  const es = textLanguage === 'es' && commMode === 'text';
  const signName = (code: SignLanguageCode) => {
    if (code === 'asl') return fr ? 'Langue des signes américaine' : es ? 'Lengua de señas estadounidense' : 'American Sign Language';
    return fr ? 'Langue des signes québécoise' : es ? 'Lengua de señas de Quebec' : 'Quebec Sign Language';
  };

  return (
    <div className="max-w-lg mx-auto w-full py-4 space-y-4">
      <div>
        <div className="ys-kicker">{fr ? 'Accessibilité' : 'Accessibility'}</div>
        <h1 className="text-[1.875rem] font-black text-[#062a4d]">{fr ? 'Préférences' : 'Preferences'}</h1>
      </div>

      <section className="ys-card p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-[#087f7b]" />
          <h2 className="font-black text-[#062a4d]">{fr ? 'Mode d’information' : 'Information mode'}</h2>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onCommModeChange(commMode === 'lsq' ? 'lsq' : 'asl')}
            className={`rounded-2xl border p-3 text-left ${commMode !== 'text' ? 'bg-[#dff7f5] border-[#087f7b]' : 'bg-white border-[#dce3e8]'}`}
          >
            <div className="font-black text-sm text-[#062a4d]">{fr ? 'Langue des signes' : 'Sign + captions'}</div>
            <div className="text-[0.75rem] text-[#65717c] mt-1">{commMode === 'text' ? 'ASL / LSQ' : getSignLanguage(commMode).shortLabel}</div>
          </button>
          <button
            onClick={() => onCommModeChange('text')}
            className={`rounded-2xl border p-3 text-left ${commMode === 'text' ? 'bg-[#dff7f5] border-[#087f7b]' : 'bg-white border-[#dce3e8]'}`}
          >
            <div className="font-black text-sm text-[#062a4d]">{fr ? 'Texte seulement' : 'Text only'}</div>
          </button>
        </div>

        {commMode !== 'text' && (
          <div className="grid grid-cols-2 gap-2">
            {SIGN_LANGUAGE_OPTIONS.map((lang) => (
              <button
                key={lang.code} aria-pressed={commMode === lang.code || textLanguage === lang.code}
                onClick={() => onCommModeChange(lang.code)}
                className={`rounded-xl border p-2 ${commMode === lang.code ? 'border-[#087f7b] bg-[#f0fbfa]' : 'border-[#dce3e8] bg-white'}`}
              >
                <span className="text-lg" aria-hidden="true">{lang.flag}</span>
                <span className="block text-xs font-black text-[#062a4d]">{lang.shortLabel}</span>
                <span className="block mt-0.5 text-[0.7rem] leading-tight text-[#65717c]">{signName(lang.code)}</span>
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          {TEXT_LANGUAGE_OPTIONS.map((lang) => (
            <button
              key={lang.code} aria-pressed={commMode === lang.code || textLanguage === lang.code}
              onClick={() => onTextLanguageChange(lang.code)}
              className={`rounded-xl border p-2 text-center ${textLanguage === lang.code ? 'bg-[#062a4d] text-white border-[#062a4d]' : 'bg-white text-[#062a4d] border-[#dce3e8]'}`}
            >
              <span className="text-base block">{lang.flag}</span>
              <span className="text-[0.75rem] font-bold">{lang.nativeLabel}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="ys-card p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-[#087f7b]" />
          <h2 className="font-black text-[#062a4d]">{fr ? 'Taille du texte' : 'Text size'}</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            ['normal', fr ? 'Normal' : 'Standard'],
            ['large', fr ? 'Grand' : 'Large'],
            ['xlarge', fr ? 'Très grand' : 'Extra large'],
          ].map(([id, label]) => (
            <button
              key={id} aria-pressed={textSize === id}
              onClick={() => onTextSizeChange(id as 'normal' | 'large' | 'xlarge')}
              className={`rounded-xl border p-3 text-xs font-black ${textSize === id ? 'bg-[#062a4d] text-white border-[#062a4d]' : 'bg-white text-[#062a4d] border-[#dce3e8]'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button role="switch" aria-checked={nightMode} onClick={onNightModeToggle} className="w-full rounded-2xl border border-[#dce3e8] p-3 flex items-center justify-between">
          <span className="flex items-center gap-2 font-bold text-sm text-[#062a4d]"><Moon className="w-5 h-5 text-[#087f7b]" />{fr ? 'Mode nuit' : es ? 'Modo noche' : 'Night mode'}</span>
          <span className={`w-11 h-6 rounded-full p-1 ${nightMode ? 'bg-[#087f7b]' : 'bg-[#dce3e8]'}`}>
            <span className={`block w-4 h-4 rounded-full bg-white transition ${nightMode ? 'translate-x-5' : ''}`} />
          </span>
        </button>
      </section>

      <section className="ys-card p-4">
        <div className="flex items-center gap-3">
          <Plane className="w-5 h-5 text-[#087f7b]" />
          <div className="flex-1">
            <div className="font-black text-[#062a4d]">{selectedFlight.flightNumber} · {selectedFlight.destination}</div>
            <div className="text-[0.75rem] text-[#65717c]">{fr ? 'Vol sélectionné' : 'Selected flight'}</div>
          </div>
          <button onClick={onChangeFlight} className="px-3 py-2 rounded-xl bg-[#eef2f5] text-[#062a4d] text-xs font-black">{fr ? 'Changer' : 'Change'}</button>
        </div>
      </section>

      <details className="ys-card p-4 group">
        <summary className="list-none cursor-pointer flex items-center justify-between gap-3">
          <div>
            <div className="font-black text-[#062a4d] text-sm">{fr ? 'Outils de démonstration' : es ? 'Herramientas de demostración' : 'Demo tools'}</div>
            <div className="text-[0.75rem] text-[#65717c]">{fr ? 'Prototype seulement' : es ? 'Solo prototipo' : 'Prototype only'}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-[#65717c] transition group-open:rotate-180" />
        </summary>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button onClick={onShowQrCodes} className="rounded-xl border border-[#dce3e8] bg-white p-3 text-xs font-black text-[#062a4d] flex items-center justify-center gap-2">
            <QrCode className="w-4 h-4 text-[#087f7b]" />{fr ? 'Codes QR' : es ? 'Códigos QR' : 'QR codes'}
          </button>
          <button onClick={onSimulateTerminalQr} className="rounded-xl border border-[#dce3e8] bg-white p-3 text-xs font-black text-[#062a4d] flex items-center justify-center gap-2">
            <MonitorSmartphone className="w-4 h-4 text-[#087f7b]" />{fr ? 'QR terminal' : es ? 'QR terminal' : 'Terminal QR'}
          </button>
        </div>
      </details>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={onReplayIntro} className="ys-secondary flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" />{fr ? 'Début' : 'Start'}</button>
        <button onClick={onOpenHelp} className="ys-primary flex items-center justify-center gap-2"><HelpCircle className="w-4 h-4" />{fr ? 'Aide' : 'Help'}</button>
      </div>
    </div>
  );
};
