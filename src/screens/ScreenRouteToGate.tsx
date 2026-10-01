import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, Navigation, Info, MapPin } from 'lucide-react';
import { CommunicationMode, TextLanguageCode } from '../types';
import { YkfReferencePhoto } from '../components/YkfReferencePhoto';
import { YKF_MEDIA, getGatePhoto } from '../data/ykfMedia';

interface Props {
  targetGate?: string;
  airline: string;
  onArrived: () => void;
  onOpenHelp: () => void;
  commMode: CommunicationMode;
  textLanguage: TextLanguageCode;
  highContrast?: boolean;
}

export const ScreenRouteToGate: React.FC<Props> = ({
  targetGate = '4',
  airline,
  onArrived,
  onOpenHelp,
  commMode,
  textLanguage,
}) => {
  const [index, setIndex] = useState(0);
  const fr = textLanguage === 'fr' || commMode === 'lsq';
  const es = textLanguage === 'es' && commMode === 'text';

  const steps = useMemo(() => [
    {
      title: fr ? 'Quittez le contrôle de sécurité' : es ? 'Sal del control de seguridad' : 'Exit security screening',
      cue: fr ? 'Repérez les panneaux des portes.' : es ? 'Busca las señales de las puertas.' : 'Look for the gate signs.',
      photo: YKF_MEDIA.catsa,
    },
    {
      title: fr ? 'Suivez les panneaux de porte' : es ? 'Sigue las señales de la puerta' : 'Follow the gate signs',
      cue: fr ? `Suivez la signalisation vers la porte ${targetGate}.` : es ? `Sigue la señalización hacia la Puerta ${targetGate}.` : `Follow airport signage toward Gate ${targetGate}.`,
      photo: YKF_MEDIA.gateEntrance,
    },
    {
      title: fr ? `Repérez la porte ${targetGate}` : es ? `Busca la Puerta ${targetGate}` : `Look for Gate ${targetGate}`,
      cue: fr ? 'Confirmez le numéro de porte sur l’écran de vol.' : es ? 'Confirma el número de puerta en la pantalla del vuelo.' : 'Confirm the gate number on the flight display.',
      photo: getGatePhoto(airline),
    },
  ], [airline, es, fr, targetGate]);

  const step = steps[index];
  const first = index === 0;
  const last = index === steps.length - 1;

  return (
    <div className="max-w-lg mx-auto w-full py-3 space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="ys-kicker">
            {fr ? `Repère ${index + 1} sur ${steps.length}` : es ? `Referencia ${index + 1} de ${steps.length}` : `Visual cue ${index + 1} of ${steps.length}`}
          </div>
          <h1 className="text-[1.6875rem] font-black text-[#062a4d] leading-tight">
            {fr ? 'Vers la porte' : es ? 'Hacia la puerta' : 'Toward Gate'} {targetGate}
          </h1>
        </div>
        <div className="flex gap-1 shrink-0 items-center" aria-label="Route progress">
          {steps.map((_, itemIndex) => (
            <span key={itemIndex} className={`block h-2 rounded-full ${itemIndex === index ? 'w-4 bg-[#087f7b]' : itemIndex < index ? 'w-2 bg-[#8fd8d3]' : 'w-2 bg-[#dce3e8]'}`} />
          ))}
        </div>
      </div>

      <section className="ys-card p-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#062a4d] text-white flex items-center justify-center shrink-0">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[1.375rem] leading-tight font-black text-[#062a4d]">{step.title}</div>
            <div className="mt-1 text-sm font-semibold text-[#59636e] flex items-start gap-1.5">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#087f7b]" />
              {step.cue}
            </div>
          </div>
        </div>
      </section>

      <section className="ys-card overflow-hidden">
        <YkfReferencePhoto
          src={step.photo.src}
          alt={fr ? step.photo.altFr : step.photo.altEn}
          label={fr ? step.photo.labelFr : step.photo.labelEn}
          className="h-[255px] sm:h-[300px]"
          objectPosition="center 48%"
          overlay={false}
        />
        <div className="px-4 py-2.5 border-t border-[#edf0f2] flex items-center justify-between gap-3">
          <div className="text-[0.75rem] font-black text-[#52606c]">{fr ? step.photo.labelFr : step.photo.labelEn}</div>
          <div className="ys-chip bg-[#edf4f7] text-[#456170]">{fr ? 'Porte' : es ? 'Puerta' : 'Gate'} {targetGate}</div>
        </div>
      </section>

      <div className="rounded-2xl border border-[#b9e5e2] bg-[#eefbfa] p-3 flex items-start gap-2">
        <Info className="w-4 h-4 text-[#087f7b] mt-0.5 shrink-0" />
        <div className="text-[0.75rem] text-[#59636e]">
          {fr
            ? 'Démo visuelle avec des photos YKF. Le trajet exact doit être validé par l’aéroport avant utilisation opérationnelle.'
            : es
              ? 'Demostración visual con fotos de YKF. La ruta exacta debe ser validada por el aeropuerto antes del uso operativo.'
              : 'Visual demo using YKF photos. Exact turn-by-turn routing must be validated by the airport before operational use.'}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          disabled={first}
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
          className="w-14 h-14 rounded-2xl border border-[#dce3e8] bg-white flex items-center justify-center disabled:opacity-30"
          aria-label={fr ? 'Repère précédent' : 'Previous visual cue'}
        >
          <ArrowLeft />
        </button>
        <button
          onClick={last ? onArrived : () => setIndex((value) => value + 1)}
          className="ys-primary flex-1 flex items-center justify-center gap-2"
        >
          <span>{last ? (fr ? 'Je suis à la porte' : es ? 'Estoy en la puerta' : 'I’m at the gate') : (fr ? 'Repère suivant' : es ? 'Siguiente referencia' : 'Next visual cue')}</span>
          {last ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </button>
        <button onClick={onOpenHelp} className="w-14 h-14 rounded-2xl border border-[#dce3e8] bg-white flex items-center justify-center" aria-label={fr ? 'Aide' : 'Help'}>
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
