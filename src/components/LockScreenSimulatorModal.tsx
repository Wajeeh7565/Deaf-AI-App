import { AccessibleDialog } from './AccessibleDialog';
import React, { useState } from 'react';
import { X, Bell, AlertTriangle, Clock, CheckCircle2, Plane, Sparkles, Smartphone } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../data/mockData';
import { LockScreenNotification } from '../types';

interface LockScreenSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlertVariant: (variantKey: string) => void;
  highContrast?: boolean;
}

export const LockScreenSimulatorModal: React.FC<LockScreenSimulatorModalProps> = ({
  isOpen,
  onClose,
  onSelectAlertVariant,
  highContrast = false,
}) => {
  const [selectedNotifKey, setSelectedNotifKey] = useState<string>('gate_change');
  const [currentTime, setCurrentTime] = useState('10:42');

  if (!isOpen) return null;

  const currentNotif: LockScreenNotification =
    MOCK_NOTIFICATIONS[selectedNotifKey] || MOCK_NOTIFICATIONS.gate_change;

  return (
    <AccessibleDialog label="Demo notification preview" onClose={onClose}>
      <div
        className={`w-full max-w-2xl rounded-3xl border-2 p-5 sm:p-6 max-h-[95vh] overflow-y-auto shadow-2xl transition-all ${
          highContrast
            ? 'bg-black text-white border-white'
            : 'bg-[#ffffff] text-[#1c1b1b] border-[#002045]'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b-2 border-current">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#002045] text-white flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 id="lockscreen-sim-title" className="text-xl font-bold tracking-tight">
                Phone Lock-Screen Alert Preview
              </h2>
              <p className="text-xs text-[#43474e]">
                Simulating background notifications when phone is locked or browser is closed
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close notification preview"
            className="min-w-[44px] min-h-[44px] p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Prototype Technical Note */}
        <div className="mt-4 p-3.5 bg-[#f0eded] border-2 border-[#c4c6cf] rounded-xl text-xs text-[#43474e] leading-relaxed flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#156967] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#002045] block font-bold mb-0.5">
              Stakeholder Prototype Note:
            </strong>
            This interactive mock demonstrates the passenger's phone lock-screen alert experience.
            Technical implementation (PWA Web Push vs Native iOS/Android companion) is under evaluation for YKF airport flight data feed integration.
          </div>
        </div>

        {/* Alert Type Selector Tabs */}
        <div className="mt-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#43474e] mb-2">
            Select an alert scenario to test:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { key: 'gate_change', label: 'Gate Changed (Gate 6)', badge: 'Gate 4 → 6' },
              { key: 'boarding', label: 'Boarding Started', badge: 'Active' },
              { key: 'delay', label: 'Flight Delayed', badge: '11:20 AM' },
              { key: 'final_call', label: 'Final Call', badge: 'Urgent' },
              { key: 'cancellation', label: 'Flight Cancelled', badge: 'Support' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedNotifKey(tab.key)}
                className={`p-2.5 rounded-xl border-2 text-left text-xs font-bold transition-all flex flex-col justify-between min-h-[58px] ${
                  selectedNotifKey === tab.key
                    ? 'bg-[#002045] text-white border-[#156967] shadow-md scale-[1.02]'
                    : 'bg-[#fcf9f8] text-[#002045] border-[#c4c6cf] hover:border-[#156967]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[0.75rem] uppercase font-mono mt-1 ${
                  selectedNotifKey === tab.key ? 'text-teal-300' : 'text-gray-500'
                }`}>
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Simulated Smartphone Lock Screen Frame */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-sm rounded-[36px] bg-slate-950 border-[6px] border-slate-800 p-4 shadow-2xl text-white relative overflow-hidden">
            {/* Phone Notch & Status Bar */}
            <div className="flex justify-between items-center px-4 pt-1 text-xs font-medium text-slate-400">
              <span>{currentTime}</span>
              <div className="w-20 h-4 bg-slate-800 rounded-full" />
              <span className="flex items-center gap-1">5G 94%</span>
            </div>

            {/* Lock Screen Clock & Date */}
            <div className="text-center py-6">
              <div className="text-5xl font-extralight tracking-tight text-slate-100 font-sans">
                {currentTime}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">
                Tuesday, August 25 • Region of Waterloo
              </div>
            </div>

            {/* The Notification Card */}
            <div
              className={`rounded-2xl p-4 border backdrop-blur-md transition-all shadow-xl ${
                currentNotif.urgent
                  ? 'bg-slate-900/95 border-red-500/70 text-slate-100'
                  : 'bg-slate-900/90 border-slate-700 text-slate-100'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#002045] flex items-center justify-center text-teal-300 border border-teal-400/40">
                    <Plane className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold tracking-tight text-teal-300">
                    YKF ASSISTANT
                  </span>
                </div>
                <span className="text-[0.75rem] text-slate-400 font-mono">
                  {currentNotif.timeAgo}
                </span>
              </div>

              <div className="mt-2.5">
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  {currentNotif.urgent && (
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  )}
                  {currentNotif.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentNotif.body}
                </p>
              </div>

              {/* Notification Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onSelectAlertVariant(selectedNotifKey);
                  }}
                  className="flex-1 py-2 px-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl text-center transition-colors shadow-sm"
                >
                  Open in Companion
                </button>
                <button
                  onClick={() => setSelectedNotifKey('gate_change')}
                  className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-xl"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* Bottom Camera / Flashlight shortcuts */}
            <div className="flex justify-between items-center px-4 pt-10 pb-2">
              <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-xs">
                💡
              </div>
              <div className="w-32 h-1 bg-slate-600 rounded-full" />
              <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-xs">
                📷
              </div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="mt-6 pt-4 border-t-2 border-current flex flex-col sm:flex-row gap-3 justify-between items-center">
          <span className="text-xs text-[#43474e]">
            Selected: <strong className="text-[#002045]">{currentNotif.title}</strong>
          </span>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onSelectAlertVariant(selectedNotifKey);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#002045] text-white font-bold text-sm hover:bg-[#1a365d] transition-colors"
            >
              Test In-App Alert View →
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border-2 border-current font-bold text-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </AccessibleDialog>
  );
};
