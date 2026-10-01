import React from 'react';
import { ArrowLeft, HelpCircle, Settings, SlidersHorizontal } from 'lucide-react';
import { CommunicationMode, ScreenId, TextLanguageCode } from '../types';
import { getSignLanguage } from '../data/languages';

interface HeaderProps {
  currentScreen: ScreenId;
  commMode: CommunicationMode;
  textLanguage: TextLanguageCode;
  onBack: () => void;
  onOpenHelp: () => void;
  onOpenSettings: () => void;
  canGoBack: boolean;
  onQuickChangeCommMode?: () => void;
  highContrast?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  commMode,
  textLanguage,
  onBack,
  onOpenHelp,
  onOpenSettings,
  canGoBack,
  onQuickChangeCommMode,
  highContrast = false,
}) => {
  const isWelcome = currentScreen === 'welcome';
  const isFr = textLanguage === 'fr' || commMode === 'lsq';
  const isEs = textLanguage === 'es' && commMode === 'text';
  const textWord = isFr ? 'Texte' : isEs ? 'Texto' : 'Text';
  const captionsWord = isFr ? 'sous-titres' : isEs ? 'subtítulos' : 'captions';
  const commLabel = commMode === 'text' ? textWord : `${getSignLanguage(commMode).shortLabel} + ${captionsWord}`;
  const backLabel = isFr ? 'Retour' : isEs ? 'Volver' : 'Back';
  const settingsLabel = isFr ? 'Réglages' : isEs ? 'Ajustes' : 'Settings';
  const helpLabel = isFr ? 'Aide' : isEs ? 'Ayuda' : 'Help';
  const headerTitle = isFr ? 'YKF Accessibilité' : isEs ? 'YKF Accesibilidad' : 'YKF Accessibility';
  const headerRegion = isFr ? 'Région de Waterloo' : isEs ? 'Región de Waterloo' : 'Region of Waterloo';

  return (
    <header className={`ykf-header ${isWelcome ? 'relative' : 'sticky top-0'} inset-x-0 z-40 border-b flex items-center justify-between px-3 sm:px-4 ${highContrast ? 'bg-black text-white border-white' : 'bg-white shadow-[0_2px_10px_rgba(6,42,77,.04)] text-[#062a4d] border-[#dce3e8]'}`}>
      <div className="flex items-center gap-2 min-w-0 ykf-header-copy-wrap">
        {canGoBack && !isWelcome ? (
          <button onClick={onBack} aria-label={backLabel} className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${highContrast ? 'bg-white text-black' : 'bg-[#f1f4f6]'}`}>
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-1" />
        )}
        <img
          src="/assets/ykf/official/region-waterloo-logo.png"
          alt="Region of Waterloo official logo"
          className="h-9 w-12 object-contain shrink-0"
        />
        <div className="min-w-0 ykf-header-copy">
          <div className="ykf-header-title font-black text-[0.9375rem] sm:text-[1.0rem] leading-tight truncate">{headerTitle}</div>
          <div className={`ykf-header-region text-[0.75rem] font-bold tracking-[.03em] truncate ${highContrast ? 'text-yellow-300' : 'text-[#65717c]'}`}>
            {headerRegion}
          </div>
        </div>
      </div>
      <div className="ykf-header-actions flex items-center gap-1 shrink-0">
        {!isWelcome && (
          <button
            onClick={onQuickChangeCommMode || onOpenSettings}
            className={`hidden min-[390px]:flex items-center gap-1 px-2.5 h-9 rounded-full text-[0.75rem] font-extrabold border ${highContrast ? 'bg-yellow-400 text-black border-white' : 'bg-[#dff7f5] text-[#086c69] border-[#9bded9]'}`}
          >
            <span>{commLabel}</span>
            <SlidersHorizontal className="w-3 h-3" />
          </button>
        )}
        <button onClick={onOpenSettings} aria-label={settingsLabel} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#f1f4f6]">
          <Settings className="w-5 h-5" />
        </button>
        <button onClick={onOpenHelp} aria-label={helpLabel} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#f1f4f6]">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
