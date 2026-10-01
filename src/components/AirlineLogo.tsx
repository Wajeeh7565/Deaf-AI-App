import React, { useState } from 'react';

// These image assets are served by the official Region of Waterloo International
// Airport website's airline-partner section. Do not replace them with generated
// wordmarks or hand-drawn approximations.
const OFFICIAL_AIRLINE_LOGOS: Record<string, { src: string; alt: string }> = {
  WestJet: {
    src: 'https://media-003-ca.cdn.govstack.com/regionofwaterloo-018-ca/media/furjo4mc/westjet-1080x1080.png?format=webp&height=270&width=270',
    alt: 'WestJet',
  },
  Flair: {
    src: 'https://media-003-ca.cdn.govstack.com/regionofwaterloo-018-ca/media/kbffwmny/flair-1080x1080.png?format=webp&height=270&width=270',
    alt: 'Flair Airlines',
  },
  Sunwing: {
    src: 'https://media-003-ca.cdn.govstack.com/regionofwaterloo-018-ca/media/xd0doaey/sunwing-1080x1080.png?format=webp&height=270&width=270',
    alt: 'Sunwing',
  },
  'Air Canada': {
    src: 'https://media-003-ca.cdn.govstack.com/regionofwaterloo-018-ca/media/rdzl1uwx/ac-1080x1080.png?format=webp&height=270&width=270',
    alt: 'Air Canada',
  },
};

const getLogo = (airline: string) => {
  if (airline.includes('WestJet')) return OFFICIAL_AIRLINE_LOGOS.WestJet;
  if (airline.includes('Flair')) return OFFICIAL_AIRLINE_LOGOS.Flair;
  if (airline.includes('Sunwing')) return OFFICIAL_AIRLINE_LOGOS.Sunwing;
  if (airline.includes('Air Canada')) return OFFICIAL_AIRLINE_LOGOS['Air Canada'];
  return null;
};

export const AirlineLogo: React.FC<{ airline: string; compact?: boolean }> = ({ airline, compact = false }) => {
  const logo = getLogo(airline);
  const [failed, setFailed] = useState(false);
  const scale = airline.includes('WestJet') ? 1.30 : airline.includes('Flair') ? 1.12 : airline.includes('Sunwing') ? 1.18 : 1.08;

  return (
    <div
      className={`ykf-airline-logo flex items-center justify-center rounded-xl bg-white border border-[#d9e2e8] overflow-hidden shrink-0 ${compact ? 'w-14 h-11 p-1' : 'w-[76px] h-[60px] p-1.5'}`}
      aria-label={logo ? `${logo.alt} official logo` : `${airline} airline`}
    >
      {logo && !failed ? (
        <img
          src={logo.src}
          alt={`${logo.alt} official logo`}
          className="ykf-airline-logo-image w-full h-full object-contain"
          style={{ transform: `scale(${scale})` }}
          loading="eager"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-[0.75rem] leading-tight text-center font-extrabold text-[#34424f]">{airline}</span>
      )}
    </div>
  );
};
