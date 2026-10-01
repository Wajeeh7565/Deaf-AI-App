import React from 'react';
import { Plane, CheckCircle2, ArrowRight, RefreshCw, MapPin, Calendar, Clock } from 'lucide-react';
import { Flight, CommunicationMode } from '../types';
import { SignLanguagePlayer } from '../components/SignLanguagePlayer';

interface ScreenFlightConfirmationProps {
  flight: Flight;
  onConfirm: () => void;
  onChangeFlight: () => void;
  commMode: CommunicationMode;
  highContrast?: boolean;
}

export const ScreenFlightConfirmation: React.FC<ScreenFlightConfirmationProps> = ({
  flight,
  onConfirm,
  onChangeFlight,
  commMode,
  highContrast = false,
}) => {
  return (
    <div className="max-w-xl mx-auto w-full py-4 px-2 flex flex-col min-h-[calc(100vh-140px)] justify-between animate-in fade-in duration-300">
      <div className="space-y-5">
        {/* Title */}
        <div className="text-center sm:text-left">
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 ${
              highContrast ? 'text-white' : 'text-[#002045]'
            }`}
          >
            Confirm your flight details
          </h1>
          <p className="text-base text-[#43474e]">
            Please verify that this is your correct departing flight today.
          </p>
        </div>

        {/* Big Confirmation Card */}
        <div
          className={`rounded-3xl border-3 p-6 shadow-sm transition-all relative overflow-hidden ${
            highContrast
              ? 'bg-black border-white text-white'
              : 'bg-[#ffffff] border-[#c4c6cf] text-[#1c1b1b]'
          }`}
        >
          {/* Airline Header */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  highContrast ? 'bg-yellow-400 text-black' : 'bg-[#002045] text-white'
                }`}
              >
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#43474e]">
                  {flight.airline}
                </span>
                <div className="text-xl font-black text-[#002045]">{flight.flightNumber}</div>
              </div>
            </div>

            {/* Status Pill */}
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                flight.status === 'Delayed' ? 'bg-[#92400E] text-white' : 'bg-[#1E5128] text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{flight.status}</span>
            </div>
          </div>

          {/* Route Display */}
          <div className="py-5 grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold text-[#43474e] uppercase block">Origin</span>
              <p className="text-xl sm:text-2xl font-black text-[#002045] mt-0.5">Waterloo (YKF)</p>
              <span className="text-xs text-[#156967] font-semibold">Region of Waterloo Airport</span>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#43474e] uppercase block">Destination</span>
              <p className="text-2xl sm:text-3xl font-black text-[#002045] mt-0.5">{flight.destination}</p>
              <span className="text-xs text-[#156967] font-semibold">{flight.destinationCode}</span>
            </div>
          </div>

          {/* Scheduled Departure Time Banner */}
          <div className="p-4 rounded-2xl bg-[#f0eded] border-2 border-[#c4c6cf] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#002045]" />
              <div>
                <span className="text-[0.75rem] font-bold uppercase tracking-wider text-[#43474e] block">
                  Departure Time
                </span>
                <span className="text-xl font-extrabold text-[#002045]">{flight.departureTime}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[0.75rem] font-bold uppercase tracking-wider text-[#43474e] block">
                Initial Gate
              </span>
              <span className="text-xl font-extrabold text-[#156967]">Gate {flight.gate}</span>
            </div>
          </div>

          {/* Visual Flight Route Graphic */}
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-[#43474e]">
            <span className="font-semibold">Flight Status: Scheduled</span>
            <span className="font-mono">Last verified: {flight.lastUpdated}</span>
          </div>
        </div>

        {/* ASL/LSQ Sign Language Video Container */}
        {commMode !== 'text' && (
          <div className="w-full">
            <SignLanguagePlayer
              commMode={commMode}
              title="Confirm Flight"
              captionText={`Confirming: You are flying on ${flight.airline} ${flight.flightNumber} to ${flight.destination}, departing at ${flight.departureTime}.`}
              compact={true}
              highContrast={highContrast}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t-2 border-[#c4c6cf] space-y-3">
        <button
          onClick={onConfirm}
          className={`w-full min-h-[58px] py-4 px-6 rounded-2xl font-bold text-lg sm:text-xl flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 ${
            highContrast
              ? 'bg-yellow-400 hover:bg-yellow-300 text-black border-3 border-white'
              : 'bg-[#002045] hover:bg-[#1a365d] text-white hover:shadow-lg'
          }`}
        >
          <CheckCircle2 className="w-6 h-6" />
          <span>This is my flight</span>
        </button>

        <button
          onClick={onChangeFlight}
          className={`w-full min-h-[52px] py-3 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 border-3 transition-all ${
            highContrast
              ? 'border-white text-white hover:bg-gray-800'
              : 'border-[#002045] text-[#002045] hover:bg-[#f0eded]'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Change flight</span>
        </button>
      </div>
    </div>
  );
};
