import { SignLanguageCode, TextLanguageCode } from '../types';

export interface SignLanguageOption {
  code: SignLanguageCode;
  shortLabel: string;
  name: string;
  country: string;
  flag: string;
  localPriority?: boolean;
}

// Pilot scope from the Sept. 18 review: keep the sign-language menu focused on
// ASL and LSQ. Other sign languages can be added when interpreter content and
// airport demand are confirmed.
export const SIGN_LANGUAGE_OPTIONS: SignLanguageOption[] = [
  { code: 'asl', shortLabel: 'ASL', name: 'American Sign Language', country: 'Canada / United States', flag: '🇨🇦', localPriority: true },
  { code: 'lsq', shortLabel: 'LSQ', name: 'Langue des signes québécoise', country: 'Canada', flag: '🇨🇦', localPriority: true },
];

export const getSignLanguage = (code: SignLanguageCode) =>
  SIGN_LANGUAGE_OPTIONS.find((item) => item.code === code) ?? SIGN_LANGUAGE_OPTIONS[0];

// Text-language pilot list. English and French are the Canadian official-language
// baseline; Spanish is retained from the current prototype. More text languages
// can be added after demographic/airport validation without changing the journey.
export const TEXT_LANGUAGE_OPTIONS: { code: TextLanguageCode; label: string; nativeLabel: string; flag: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇨🇦' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇨🇦' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸' },
];

export const detectTextLanguage = (): TextLanguageCode => {
  if (typeof navigator === 'undefined') return 'en';
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const primary = (languages[0] || 'en').toLowerCase();
  if (primary.startsWith('fr')) return 'fr';
  if (primary.startsWith('es')) return 'es';
  return 'en';
};
