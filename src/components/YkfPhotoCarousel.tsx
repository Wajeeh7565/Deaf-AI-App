import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { TextLanguageCode } from '../types';
import { YkfPhoto } from '../data/ykfMedia';
import { YkfReferencePhoto } from './YkfReferencePhoto';
import { jt } from '../data/textJourneyCopy';

interface Props {
  photos: YkfPhoto[];
  language: TextLanguageCode;
  title?: string;
  note?: string;
  className?: string;
  autoAdvance?: boolean;
  intervalMs?: number;
  large?: boolean;
}

export const YkfPhotoCarousel: React.FC<Props> = ({
  photos,
  language,
  title,
  note,
  className = '',
  autoAdvance = false,
  intervalMs = 1500,
  large = false,
}) => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const [manualPauseUntil, setManualPauseUntil] = useState(0);

  useEffect(() => {
    setIndex((value) => Math.min(value, Math.max(0, photos.length - 1)));
  }, [photos.length]);

  useEffect(() => {
    if (!autoAdvance || photos.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      if (Date.now() < manualPauseUntil || document.hidden) return;
      setIndex((value) => (value + 1) % photos.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [autoAdvance, photos.length, intervalMs, manualPauseUntil]);

  const setManualIndex = (next: number) => {
    setIndex((next + photos.length) % photos.length);
    setManualPauseUntil(Date.now() + 2500);
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 35) return;
    setManualIndex(index + (delta < 0 ? 1 : -1));
  };

  if (!photos.length) return null;
  const photo = photos[index];

  return (
    <section className={`ys-card overflow-hidden ${className}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="px-4 py-2.5 flex items-center gap-2 border-b border-[#edf0f2]">
        <Images className="w-4 h-4 text-[#087f7b]" />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-black text-[#062a4d] truncate">{title || jt(language, 'officialPhotos')}</div>
          {note && <div className="text-[0.75rem] text-[#65717c] mt-0.5 truncate">{note}</div>}
        </div>
        {photos.length > 1 && <div className="text-[0.75rem] font-bold text-[#7a858e]">{index + 1}/{photos.length}</div>}
      </div>

      <YkfReferencePhoto
        src={photo.src}
        alt={language === 'fr' ? photo.altFr : photo.altEn}
        label={language === 'fr' ? photo.labelFr : photo.labelEn}
        className={large ? 'h-[210px] sm:h-[260px]' : 'h-[190px] sm:h-[220px]'}
        objectPosition="center 48%"
      />

      {photos.length > 1 && (
        <div className="p-2.5 flex items-center gap-2">
          <button
            aria-label={language === 'fr' ? 'Photo précédente' : language === 'es' ? 'Foto anterior' : 'Previous photo'}
            onClick={() => setManualIndex(index - 1)}
            className="w-10 h-10 rounded-xl border border-[#dce3e8] bg-white flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 flex justify-center gap-1" aria-label="Photo position">
            {photos.map((_, itemIndex) => {
              const active = itemIndex === index;
              return (
                <button
                  aria-label={`Photo ${itemIndex + 1}`}
                  aria-pressed={active}
                  key={itemIndex}
                  onClick={() => setManualIndex(itemIndex)}
                  className="ykf-photo-dot rounded-full transition-all"
                >
                  <span className={`block rounded-full transition-all ${active ? 'h-2 w-4 bg-[#087f7b]' : 'h-2 w-2 bg-[#cfd8de]'}`} />
                </button>
              );
            })}
          </div>
          <button
            aria-label={language === 'fr' ? 'Photo suivante' : language === 'es' ? 'Foto siguiente' : 'Next photo'}
            onClick={() => setManualIndex(index + 1)}
            className="w-10 h-10 rounded-xl border border-[#dce3e8] bg-white flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};
