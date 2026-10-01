import React, { useState } from 'react';
import { ArrowRight, Hand, Waves, FileText, CheckCircle2 } from 'lucide-react';
import { CommunicationMode } from '../types';

interface ScreenCommPreferenceProps {
  selectedMode: CommunicationMode;
  onSelectMode: (mode: CommunicationMode) => void;
  onContinue: () => void;
  highContrast?: boolean;
}

export const ScreenCommPreference: React.FC<ScreenCommPreferenceProps> = ({
  selectedMode,
  onSelectMode,
  onContinue,
  highContrast = false,
}) => {
  const [currentSelection, setCurrentSelection] = useState<CommunicationMode>(selectedMode);

  const handleSelect = (mode: CommunicationMode) => {
    setCurrentSelection(mode);
    onSelectMode(mode);
  };

  const options: {
    id: CommunicationMode;
    title: string;
    description: string;
    icon: React.ReactNode;
    badge: string;
  }[] = [
    {
      id: 'asl',
      title: 'ASL + Text',
      description: 'American Sign Language video with written captions for all directions and alerts.',
      icon: <Hand className="w-8 h-8 text-current" />,
      badge: 'Recommended for ASL signers',
    },
    {
      id: 'lsq',
      title: 'LSQ + Text',
      description: 'Langue des signes québécoise video with French and English written captions.',
      icon: <Waves className="w-8 h-8 text-current" />,
      badge: 'Recommandé pour LSQ',
    },
    {
      id: 'text',
      title: 'Text Only',
      description: 'High-readability written captions and visual cards without sign language videos.',
      icon: <FileText className="w-8 h-8 text-current" />,
      badge: 'Compact & fast reading',
    },
  ];

  return (
    <div className="max-w-xl mx-auto w-full py-4 px-2 flex flex-col min-h-[calc(100vh-140px)] justify-between animate-in fade-in duration-300">
      <div>
        {/* Heading */}
        <div className="text-center sm:text-left mb-6">
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${
              highContrast ? 'text-white' : 'text-[#002045]'
            }`}
          >
            How would you like information presented?
          </h1>
          <p className="text-base sm:text-lg text-[#43474e]">
            You can change this anytime in settings without restarting your journey.
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-4" role="radiogroup" aria-label="Communication Preference">
          {options.map((opt) => {
            const isSelected = currentSelection === opt.id;

            return (
              <button
                key={opt.id}
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelect(opt.id)}
                className={`w-full text-left p-5 rounded-2xl border-3 transition-all flex flex-col sm:flex-row items-start gap-4 relative shadow-sm ${
                  isSelected
                    ? highContrast
                      ? 'bg-black border-yellow-400 text-white ring-4 ring-yellow-400/40'
                      : 'bg-[#ffffff] border-[#156967] ring-4 ring-[#a3edea]/50'
                    : highContrast
                    ? 'bg-gray-900 border-gray-700 text-gray-200 hover:border-gray-500'
                    : 'bg-[#ffffff] border-[#c4c6cf] hover:border-[#156967] hover:bg-[#fcf9f8]'
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? highContrast
                        ? 'bg-yellow-400 text-black font-extrabold'
                        : 'bg-[#002045] text-white'
                      : highContrast
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-[#f0eded] text-[#002045]'
                  }`}
                >
                  {opt.icon}
                </div>

                {/* Content */}
                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-2 mb-1">
                    <h2
                      className={`text-xl font-bold ${
                        isSelected
                          ? highContrast
                            ? 'text-yellow-300'
                            : 'text-[#002045]'
                          : 'text-[#002045]'
                      }`}
                    >
                      {opt.title}
                    </h2>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-[#a3edea] text-[#1c6d6b]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#43474e] leading-relaxed">
                    {opt.description}
                  </p>
                  <span className="inline-block mt-2 text-xs font-semibold text-[#156967]">
                    {opt.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Action */}
      <div className="mt-8 pt-4 border-t-2 border-[#c4c6cf] flex justify-end">
        <button
          onClick={onContinue}
          className={`w-full sm:w-auto min-w-[200px] min-h-[56px] px-8 py-3.5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 ${
            highContrast
              ? 'bg-yellow-400 hover:bg-yellow-300 text-black border-3 border-white'
              : 'bg-[#002045] hover:bg-[#1a365d] text-white hover:shadow-lg'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
