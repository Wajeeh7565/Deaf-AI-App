import React from 'react';
import { ArrowRight, FastForward } from 'lucide-react';
import { CommunicationMode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';

interface ScreenWelcomeVideoProps {
  commMode: CommunicationMode;
  onContinue: () => void;
  onSkip: () => void;
  onCommModeChange?: (mode: CommunicationMode) => void;
  highContrast?: boolean;
}

export const ScreenWelcomeVideo: React.FC<ScreenWelcomeVideoProps> = ({
  commMode,
  onContinue,
  onSkip,
  onCommModeChange,
  highContrast = false,
}) => {
  const isVideoMode = commMode !== 'text';
  const label = commMode === 'lsq' ? 'LSQ Welcome Video' : 'ASL Welcome Video';

  return (
    <div className="max-w-xl mx-auto w-full py-4 px-2 flex flex-col min-h-[calc(100vh-140px)] justify-between animate-in fade-in duration-300">
      <div className="space-y-6">
        {/* Prominent Video Container */}
        {isVideoMode && (
          <div className="w-full">
            <SignLanguagePlayer
              commMode={commMode}
              title={label}
              captionText="Welcome to Waterloo Region International Airport. We are here to guide you through check-in, security, and to your gate."
              autoPlay={true}
              onCommModeChange={onCommModeChange}
              highContrast={highContrast}
            />
          </div>
        )}

        {/* Written Concise Text */}
        <div
          className={`p-6 rounded-3xl border-2 text-center transition-all ${
            highContrast
              ? 'bg-black border-white text-white'
              : 'bg-[#ffffff] border-[#c4c6cf] text-[#1c1b1b]'
          }`}
        >
          <span
            className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-[#a3edea] text-[#1c6d6b]'
            }`}
          >
            {isVideoMode ? `${commMode.toUpperCase()} + Text Active` : 'Text Mode Active'}
          </span>

          <h2
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${
              highContrast ? 'text-yellow-300' : 'text-[#002045]'
            }`}
          >
            Welcome to YKF
          </h2>

          <p className="text-base sm:text-lg text-[#43474e] leading-relaxed max-w-md mx-auto">
            Welcome to Waterloo Region International Airport. We are here to guide you through check-in, baggage drop, CATSA security, and directly to your departure gate.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 pt-4 border-t-2 border-[#c4c6cf] space-y-3">
        <button
          onClick={onContinue}
          className={`w-full min-h-[58px] py-4 px-6 rounded-2xl font-bold text-lg sm:text-xl flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 ${
            highContrast
              ? 'bg-yellow-400 hover:bg-yellow-300 text-black border-3 border-white'
              : 'bg-[#002045] hover:bg-[#1a365d] text-white hover:shadow-lg'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-6 h-6" />
        </button>

        <button
          onClick={onSkip}
          className={`w-full min-h-[52px] py-3 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 border-3 transition-all ${
            highContrast
              ? 'border-white text-white hover:bg-gray-800'
              : 'border-[#002045] text-[#002045] hover:bg-[#f0eded]'
          }`}
        >
          <FastForward className="w-4 h-4" />
          <span>Skip Introduction</span>
        </button>
      </div>
    </div>
  );
};
