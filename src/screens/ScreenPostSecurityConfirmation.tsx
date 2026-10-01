import React from 'react';
import { CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { CommunicationMode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';

interface ScreenPostSecurityConfirmationProps {
  onYesThroughSecurity: () => void;
  onNeedHelp: () => void;
  commMode: CommunicationMode;
  highContrast?: boolean;
}

export const ScreenPostSecurityConfirmation: React.FC<ScreenPostSecurityConfirmationProps> = ({
  onYesThroughSecurity,
  onNeedHelp,
  commMode,
  highContrast = false,
}) => {
  return (
    <div className="max-w-xl mx-auto w-full py-4 px-2 flex flex-col min-h-[calc(100vh-140px)] justify-between animate-in fade-in duration-300">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${
              highContrast ? 'text-white' : 'text-[#002045]'
            }`}
          >
            Are you now through security and in the departure area?
          </h1>
          <p className="text-base text-[#43474e]">
            Once you have your carry-on luggage from the CATSA checkpoint, we will bring up your live Gate Dashboard and step-by-step walking path.
          </p>
        </div>

        {/* ASL/LSQ Sign Language Video */}
        {commMode !== 'text' && (
          <div className="w-full">
            <SignLanguagePlayer
              commMode={commMode}
              title="Post-Security Status"
              captionText="Are you now through the security checkpoint and inside the departures lounge area?"
              highContrast={highContrast}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 pt-4 border-t-2 border-[#c4c6cf] space-y-4">
        <button
          onClick={onYesThroughSecurity}
          className={`w-full min-h-[64px] py-4 px-6 rounded-2xl font-bold text-lg sm:text-xl flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 ${
            highContrast
              ? 'bg-yellow-400 hover:bg-yellow-300 text-black border-3 border-white'
              : 'bg-[#002045] hover:bg-[#1a365d] text-white hover:shadow-lg'
          }`}
        >
          <CheckCircle2 className="w-6 h-6" />
          <span>Yes (Go to Gate Dashboard)</span>
        </button>

        <button
          onClick={onNeedHelp}
          className={`w-full min-h-[56px] py-3.5 px-6 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 border-3 transition-all ${
            highContrast
              ? 'border-white text-white hover:bg-gray-800'
              : 'border-[#002045] text-[#002045] hover:bg-[#f0eded]'
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span>I still need help</span>
        </button>
      </div>
    </div>
  );
};
