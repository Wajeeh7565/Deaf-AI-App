import React, { useEffect, useRef, useState } from 'react';
import { Hand } from 'lucide-react';
import { CommunicationMode } from '../types';
interface Props {
  commMode: CommunicationMode;
  title?: string;
  captionText?: string;
  compact?: boolean;
  onCommModeChange?: (mode: CommunicationMode) => void;
  highContrast?: boolean;
  className?: string;
  autoPlay?: boolean;
  autoPlayDelayMs?: number;
  loop?: boolean;
  hideControls?: boolean;
  presentationMode?: boolean;
  sticky?: boolean;
  posterImage?: string;
  videoSrc?: string;
  announcementCode?: string;
  onEnded?: () => void;
}


export const SignLanguagePlayer: React.FC<Props> = ({ commMode, title, captionText, videoSrc,
  autoPlay = false, autoPlayDelayMs = 0, loop = false, sticky = false, className = '', onEnded }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const fr = commMode === 'lsq';
  const available = commMode !== 'text' && Boolean(videoSrc);
  useEffect(() => {
    setFailed(false);
    const video = ref.current;
    if (!available || !autoPlay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => { video?.play().catch(() => undefined); }, autoPlayDelayMs);
    return () => window.clearTimeout(timer);
  }, [videoSrc, available, autoPlay, autoPlayDelayMs]);
  if (commMode === 'text') return captionText ? <p className="ys-card p-4">{captionText}</p> : null;
  return <section aria-label={title || (fr ? 'Vidéo LSQ' : 'ASL video')}
    className={`w-full ${sticky ? 'ykf-sticky-player sticky z-30' : ''} ${className} ykf-video-panel rounded-[22px] border border-[#dce3e8] bg-white overflow-hidden`}>
    {available && !failed ? <>
      <div className="w-full flex justify-center bg-white">
        <video key={videoSrc} ref={ref} src={videoSrc} playsInline muted preload="metadata" loop={loop}
        aria-label={title || (fr ? 'LSQ' : 'ASL')} className="block w-full h-auto max-h-[60vh] object-contain bg-transparent"
        controls={false}
        onClick={() => {
          const video = ref.current;
          if (!video) return;
          if (video.paused) video.play().catch(() => undefined); else video.pause();
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          const video = ref.current;
          if (!video) return;
          if (video.paused) video.play().catch(() => undefined); else video.pause();
        }}
        tabIndex={0}
        onError={() => setFailed(true)}
        onEnded={() => onEnded?.()} />
      </div>
    </> : <div className="p-5 text-center text-[#062a4d]">
      <Hand className="mx-auto mb-2" aria-hidden="true"/>
      <p className="font-bold" role="status">{failed ? (fr ? 'Vidéo indisponible. Consultez le texte ci-dessous.' : 'Video unavailable. Read the text below.') : fr ? 'Vidéo LSQ à venir. Consultez le texte ci-dessous.' : 'ASL video coming soon. Read the text below.'}</p>
    </div>}
    {captionText && <p className="px-3 py-2 text-sm font-semibold leading-snug text-center text-[#24313c]">{captionText}</p>}
  </section>;
};
