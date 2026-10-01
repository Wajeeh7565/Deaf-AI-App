import { TextLanguageCode } from '../types';

const COPY = {
  en: {
    welcomeTitle: 'Choose how you want information',
    welcomeSubtitle: 'Choose sign language with captions, or text only.',
    signLanguage: 'Sign Language + Captions',
    signLanguageDesc: 'Choose your preferred sign language. Captions stay visible.',
    textOnly: 'Text Only',
    textOnlyDesc: 'Use written information in your preferred text language.',
    recommendedYkf: 'Recommended at YKF', moreSigns: 'More sign languages', textLanguage: 'Text language', detected: 'Detected from your phone/browser',
    continueFlight: 'Choose your flight', flightTitle: 'Which flight are you taking today?', flightSubtitle: "Select your departing flight from today's scheduled departures at YKF.",
    scrollMore: 'Scroll down for more', flightNotListed: "My flight isn't listed", selectToContinue: 'Select a flight above to continue',
    alertsTitle: 'Important flight alerts', alertsDesc: 'Gate changes, delays, boarding and final call.', turnOnAlerts: 'Turn on notifications', alertsOn: 'Flight alerts are on', continueWith: 'Continue with',
    bagQuestion: 'Do you need to check a bag?', bagYes: 'Yes, check a bag', bagNo: 'No, carry-on only', bagHint: 'Checked luggage is dropped off before security.',
    security: 'Security Screening (CATSA)', departuresGate: 'Continue to Departures & Gate', destination: 'Destination', departs: 'Departs', departureGate: 'Departure Gate', wayfinding: 'Wayfinding', lastUpdated: 'Last updated', showRoute: 'Show route to gate', stepVisual: 'Step-by-step visual photos', flightUpdates: 'Flight updates', alertsActive: 'Notification examples', talkStaff: 'Talk with Staff', speechText: 'Speech-to-text', changeFlight: 'Change flight', chooseAnother: 'Select another departure',
  },
  fr: {
    welcomeTitle: 'Choisissez comment recevoir l’information', welcomeSubtitle: 'Choisissez la langue des signes avec sous-titres, ou le texte seulement.',
    signLanguage: 'Langue des signes + sous-titres', signLanguageDesc: 'Choisissez votre langue des signes. Les sous-titres restent visibles.', textOnly: 'Texte seulement', textOnlyDesc: 'Utilisez les informations écrites dans votre langue préférée.',
    recommendedYkf: 'Recommandé à YKF', moreSigns: 'Autres langues des signes', textLanguage: 'Langue du texte', detected: 'Détectée depuis votre téléphone/navigateur',
    continueFlight: 'Choisir votre vol', flightTitle: 'Quel vol prenez-vous aujourd’hui?', flightSubtitle: 'Sélectionnez votre vol au départ de YKF aujourd’hui.', scrollMore: 'Faites défiler pour en voir plus', flightNotListed: "Mon vol n'est pas affiché", selectToContinue: 'Sélectionnez un vol pour continuer',
    alertsTitle: 'Alertes importantes du vol', alertsDesc: 'Changement de porte, retard, embarquement et dernier appel.', turnOnAlerts: 'Activer les notifications', alertsOn: 'Les alertes du vol sont activées', continueWith: 'Continuer avec',
    bagQuestion: 'Avez-vous un bagage à enregistrer?', bagYes: 'Oui, enregistrer un bagage', bagNo: 'Non, bagage à main seulement', bagHint: 'Les bagages enregistrés sont déposés avant le contrôle de sécurité.', security: 'Contrôle de sécurité (ACSTA/CATSA)', departuresGate: 'Continuer vers les départs et la porte', destination: 'Destination', departs: 'Départ', departureGate: 'Porte de départ', wayfinding: 'Itinéraire', lastUpdated: 'Dernière mise à jour', showRoute: 'Afficher le trajet vers la porte', stepVisual: 'Photos visuelles étape par étape', flightUpdates: 'Mises à jour du vol', alertsActive: 'Exemples de notifications', talkStaff: 'Parler au personnel', speechText: 'Transcription de la parole', changeFlight: 'Changer de vol', chooseAnother: 'Choisir un autre départ',
  },
  es: {
    welcomeTitle: 'Elige cómo recibir la información', welcomeSubtitle: 'Elige lengua de señas con subtítulos o solo texto.', signLanguage: 'Lengua de señas + subtítulos', signLanguageDesc: 'Elige tu lengua de señas preferida. Los subtítulos permanecen visibles.', textOnly: 'Solo texto', textOnlyDesc: 'Usa información escrita en tu idioma de texto preferido.',
    recommendedYkf: 'Recomendado en YKF', moreSigns: 'Más lenguas de señas', textLanguage: 'Idioma del texto', detected: 'Detectado desde tu teléfono/navegador', continueFlight: 'Elegir tu vuelo', flightTitle: '¿Qué vuelo tomas hoy?', flightSubtitle: 'Selecciona tu vuelo de salida de YKF de hoy.', scrollMore: 'Desplázate para ver más', flightNotListed: 'Mi vuelo no aparece', selectToContinue: 'Selecciona un vuelo para continuar',
    alertsTitle: 'Alertas importantes del vuelo', alertsDesc: 'Cambio de puerta, retraso, embarque y última llamada.', turnOnAlerts: 'Activar notificaciones', alertsOn: 'Las alertas del vuelo están activadas', continueWith: 'Continuar con', bagQuestion: '¿Necesitas facturar una maleta?', bagYes: 'Sí, facturar una maleta', bagNo: 'No, solo equipaje de mano', bagHint: 'El equipaje facturado se entrega antes del control de seguridad.', security: 'Control de seguridad (CATSA)', departuresGate: 'Continuar a salidas y puerta', destination: 'Destino', departs: 'Salida', departureGate: 'Puerta de salida', wayfinding: 'Ruta', lastUpdated: 'Última actualización', showRoute: 'Mostrar ruta a la puerta', stepVisual: 'Fotos visuales paso a paso', flightUpdates: 'Actualizaciones del vuelo', alertsActive: 'Ejemplos de notificaciones', talkStaff: 'Hablar con el personal', speechText: 'Voz a texto', changeFlight: 'Cambiar vuelo', chooseAnother: 'Elegir otra salida',
  },
} as const;

export type CopyKey = keyof typeof COPY.en;
export const t = (language: TextLanguageCode, key: CopyKey): string => COPY[language]?.[key] ?? COPY.en[key];
