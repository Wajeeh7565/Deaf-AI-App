import { AccessibleDialog } from './AccessibleDialog';
import React from 'react';
import { QrCode, X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface QrEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartEntrance: () => void;
  onStartTerminal: () => void;
  highContrast?: boolean;
}

export const QrEntryModal: React.FC<QrEntryModalProps> = ({
  isOpen,
  onClose,
  onStartEntrance,
  onStartTerminal,
  highContrast = false,
}) => {
  if (!isOpen) return null;

  const cardClass = highContrast
    ? 'bg-black text-white border-white'
    : 'bg-white text-[#1c1b1b] border-[#c4c6cf]';

  return (
    <AccessibleDialog label="Demo QR entry points" onClose={onClose}>
      <div
        className={`w-full max-w-3xl rounded-3xl border-2 p-5 sm:p-7 shadow-2xl ${
          highContrast ? 'bg-black text-white border-white' : 'bg-[#fcf9f8] text-[#1c1b1b] border-[#002045]'
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b-2 border-current pb-4">
          <div className="flex gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#002045] text-white flex items-center justify-center shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-[#156967]">Prototype QR entry points</p>
              <h2 id="qr-entry-title" className="text-2xl font-extrabold tracking-tight">YKF Accessibility Companion QR Codes</h2>
              <p className={`mt-1 text-sm ${highContrast ? 'text-white' : 'text-[#43474e]'}`}>
                The entrance and post-security terminal use different QR entry points so the app can start the correct passenger flow.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close QR code preview"
            className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center hover:bg-gray-200/60"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border-2 border-dashed border-[#d4a72c] bg-[#fff7d6] text-[#4a3a00] p-3 text-sm font-medium">
          <strong>Prototype note:</strong> these QR codes now use the public Netlify prototype. Flight, route, media, signing and notification content remain sample/simulated data until YKF-approved sources are connected.
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <section className={`rounded-2xl border-2 p-4 ${cardClass}`}>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-[#156967]" />
              <h3 className="text-lg font-extrabold text-[#002045]">Entrance / Landside QR</h3>
            </div>
            <p className="text-sm text-[#43474e] mb-3">Starts the full journey: communication mode → flight → bags → security → gate.</p>
            <div className="bg-white rounded-2xl border-2 border-[#002045] p-3 flex justify-center">
              <img src="/assets/qr-entrance.png" alt="Prototype QR code for the YKF entrance flow" className="w-52 h-52 max-w-full" />
            </div>
            <p className="text-[0.75rem] text-[#74777f] mt-2 break-all">Public prototype: https://effortless-chaja-d038f8.netlify.app/?zone=entrance</p>
            <button
              onClick={() => { onClose(); onStartEntrance(); }}
              className="mt-3 w-full min-h-[50px] rounded-xl bg-[#002045] text-white font-bold flex items-center justify-center gap-2"
            >
              Simulate entrance scan <ArrowRight className="w-4 h-4" />
            </button>
          </section>

          <section className={`rounded-2xl border-2 p-4 ${cardClass}`}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-[#156967]" />
              <h3 className="text-lg font-extrabold text-[#002045]">Terminal / Airside QR</h3>
            </div>
            <p className="text-sm text-[#43474e] mb-3">Recognizes that the passenger is already past security and bypasses bag-drop/CATSA questions.</p>
            <div className="bg-white rounded-2xl border-2 border-[#002045] p-3 flex justify-center">
              <img src="/assets/qr-terminal.png" alt="Prototype QR code for the YKF post-security terminal flow" className="w-52 h-52 max-w-full" />
            </div>
            <p className="text-[0.75rem] text-[#74777f] mt-2 break-all">Public prototype: https://effortless-chaja-d038f8.netlify.app/?zone=terminal</p>
            <button
              onClick={() => { onClose(); onStartTerminal(); }}
              className="mt-3 w-full min-h-[50px] rounded-xl border-2 border-[#002045] text-[#002045] font-bold flex items-center justify-center gap-2"
            >
              Simulate terminal scan <ArrowRight className="w-4 h-4" />
            </button>
          </section>
        </div>
      </div>
    </AccessibleDialog>
  );
};
