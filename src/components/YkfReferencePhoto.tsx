import React, { useState } from 'react';
import { Camera, MapPin } from 'lucide-react';

interface Props {
  src: string;
  alt: string;
  label: string;
  note?: string;
  sourcePage?: string;
  className?: string;
  objectPosition?: string;
  overlay?: boolean;
}

export const YkfReferencePhoto: React.FC<Props> = ({
  src,
  alt,
  label,
  note,
  className = '',
  objectPosition = 'center',
  overlay = true,
}) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#eaf1f5] ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
          onError={() => setFailed(true)}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 ys-visual-placeholder">
          <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center text-[#087f7b]">
            <Camera className="w-6 h-6" />
          </div>
          <div className="mt-2 text-sm font-black text-[#062a4d]">YKF photo unavailable</div>
        </div>
      )}

      {overlay && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061e37]/90 via-[#061e37]/45 to-transparent px-4 pt-8 pb-2.5 text-white">
          <div className="flex items-center gap-1.5 text-[0.75rem] font-black">
            <MapPin className="w-3.5 h-3.5 text-[#71e2dc]" />
            {label}
          </div>
          {note && <div className="mt-0.5 text-[0.75rem] leading-snug text-white/85">{note}</div>}
        </div>
      )}
    </div>
  );
};
