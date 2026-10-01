import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Clock, HelpCircle, RefreshCw } from 'lucide-react';
import { CommunicationMode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';

interface ScreenBagDropCompletionProps {
  onYesContinueSecurity: () => void;
  onNotYet: () => void;
  commMode: CommunicationMode;
  highContrast?: boolean;
}

export const ScreenBagDropCompletion: React.FC<ScreenBagDropCompletionProps> = ({
  onYesContinueSecurity,
  onNotYet,
  commMode,
  highContrast = false,
}) => {
  const [showWaitMessage, setShowWaitMessage] = useState(false);

  const handleNotYet = () => {
    setShowWaitMessage(true);
    setTimeout(() => {
      onNotYet();
    }, 1200);
  };

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
            Have you finished dropping off your checked bag?
          </h1>
          <p className="text-base text-[#43474e]">
            Once your luggage tags are scanned and accepted, we will guide you to the CATSA security screening line.
          </p>
        </div>

        {/* ASL/LSQ Sign Language Video Container */}
        {commMode !== 'text' && (
          <div className="w-full">
            <SignLanguagePlayer
              commMode={commMode}
              title="Bag Drop Status"
              captionText="Are your bags checked in? When finished, select 'Yes, continue to security'."
              highContrast={highContrast}
            />
          </div>
        )}

        {/* Temporary Feedback Message if Not Yet selected */}
        {showWaitMessage && (
          <div className="p-4 bg-[#f0eded] border-2 border-[#156967] rounded-2xl flex items-center gap-3 animate-in fade-in text-[#002045]">
            <Clock className="w-5 h-5 text-[#156967] shrink-0" />
            <span className="text-sm font-semibold">
              Take your time. Returning to bag drop directions...
            </span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-8 pt-4 border-t-2 border-[#c4c6cf] space-y-4">
        <button
          onClick={onYesContinueSecurity}
          className={`w-full min-h-[64px] py-4 px-6 rounded-2xl font-bold text-lg sm:text-xl flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 ${
            highContrast
              ? 'bg-yellow-400 hover:bg-yellow-300 text-black border-3 border-white'
              : 'bg-[#002045] hover:bg-[#1a365d] text-white hover:shadow-lg'
          }`}
        >
          <CheckCircle2 className="w-6 h-6" />
          <span>Yes, continue to security</span>
        </button>

        <button
          onClick={handleNotYet}
          className={`w-full min-h-[56px] py-3.5 px-6 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 border-3 transition-all ${
            highContrast
              ? 'border-white text-white hover:bg-gray-800'
              : 'border-[#002045] text-[#002045] hover:bg-[#f0eded]'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Not yet (Keep bag drop instructions)</span>
        </button>
      </div>
    </div>
  );
};
