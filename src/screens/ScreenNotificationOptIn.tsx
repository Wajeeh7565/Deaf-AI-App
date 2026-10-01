import React, { useState } from 'react';
import { Bell, BellRing, ArrowRight, ShieldCheck, Smartphone, CheckCircle2 } from 'lucide-react';
import { Flight } from '../types';

interface ScreenNotificationOptInProps {
  flight: Flight;
  onAllow: () => void;
  onNotNow: () => void;
  onPreviewLockScreen: () => void;
  highContrast?: boolean;
}

export const ScreenNotificationOptIn: React.FC<ScreenNotificationOptInProps> = ({
  flight,
  onAllow,
  onNotNow,
  onPreviewLockScreen,
  highContrast = false,
}) => {
  const [granted, setGranted] = useState(false);

  const handleAllowClick = () => {
    setGranted(true);
    setTimeout(() => {
      onAllow();
    }, 900);
  };

  return (
    <div className="max-w-xl mx-auto w-full py-4 px-2 flex flex-col min-h-[calc(100vh-140px)] justify-between animate-in fade-in duration-300">
      <div className="space-y-5">
        {/* Icon & Title */}
        <div className="text-center sm:text-left">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-[#a3edea] text-[#002045]'
            }`}
          >
            <BellRing className="w-8 h-8 text-[#156967]" />
          </div>

          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${
              highContrast ? 'text-white' : 'text-[#002045]'
            }`}
          >
            Turn on flight updates
          </h1>
          <p className="text-base sm:text-lg text-[#43474e] leading-relaxed">
            Receive important accessible alerts for <strong>{flight.airline} {flight.flightNumber}</strong>, including gate changes, delays, boarding announcements, and final call.
          </p>
        </div>

        {/* Live Confirmation / What you will receive */}
        <div
          className={`rounded-3xl border-2 p-5 space-y-3.5 ${
            highContrast
              ? 'bg-black border-white text-white'
              : 'bg-[#ffffff] border-[#c4c6cf] text-[#1c1b1b]'
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#156967] block">
            What alerts you will receive:
          </span>

          <div className="space-y-2.5 text-sm">
            {[
              'Immediate visual alerts if your gate changes (e.g. Gate 4 → Gate 6)',
              'Flight delay & revised departure timestamps',
              'Boarding started notification with group status',
              'Final boarding call before gate doors close',
            ].map((text, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#1E5128]/15 text-[#1E5128] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5128]" />
                </div>
                <span className="text-[#43474e] font-medium leading-tight">{text}</span>
              </div>
            ))}
          </div>

          {/* Lock Screen Preview Card */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="p-3.5 rounded-2xl bg-[#00152e] text-white border border-teal-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[0.75rem] font-mono text-teal-300 uppercase tracking-wider">
                    Lock Screen Preview
                  </div>
                  <div className="text-xs font-bold">
                    Boarding started • {flight.destination} ({flight.flightNumber})
                  </div>
                </div>
              </div>

              <button
                onClick={onPreviewLockScreen}
                className="text-xs bg-teal-500 hover:bg-teal-400 text-black font-bold px-2.5 py-1.5 rounded-lg transition-colors"
              >
                Simulate
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#74777f] pt-1">
            <ShieldCheck className="w-4 h-4 text-[#156967] shrink-0" />
            <span>Updates stop automatically once your flight has departed. No tracking.</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 pt-4 border-t-2 border-[#c4c6cf] space-y-3">
        {granted ? (
          <div className="w-full py-4 rounded-2xl bg-[#1E5128] text-white font-bold text-lg flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-6 h-6" />
            <span>Flight updates enabled! Proceeding...</span>
          </div>
        ) : (
          <>
            <button
              onClick={handleAllowClick}
              className={`w-full min-h-[58px] py-4 px-6 rounded-2xl font-bold text-lg sm:text-xl flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 ${
                highContrast
                  ? 'bg-yellow-400 hover:bg-yellow-300 text-black border-3 border-white'
                  : 'bg-[#002045] hover:bg-[#1a365d] text-white hover:shadow-lg'
              }`}
            >
              <Bell className="w-6 h-6" />
              <span>Allow flight updates</span>
            </button>

            <button
              onClick={onNotNow}
              className={`w-full min-h-[50px] py-3 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 border-2 transition-all ${
                highContrast
                  ? 'border-gray-500 text-gray-300 hover:border-white'
                  : 'border-[#c4c6cf] text-[#43474e] hover:bg-[#f0eded] hover:text-[#002045]'
              }`}
            >
              <span>Not now (Use in-app only)</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
