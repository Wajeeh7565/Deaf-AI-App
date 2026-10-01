export interface AnnouncementMedia {
  code: string;
  src: string;
  en: string;
  fr: string;
  ykfCore?: boolean;
  futureOnly?: boolean;
}

export const LSQ_ANNOUNCEMENTS: Record<string, AnnouncementMedia> = {
  '1': {
    code: '1', src: '/lsq/lsq-1.mp4', ykfCore: true,
    en: 'Welcome to the airport. Please select your flight.',
    fr: "Bienvenue à l’aéroport. Veuillez sélectionner votre vol.",
  },
  '2': {
    code: '2', src: '/lsq/lsq-2.mp4', ykfCore: true,
    en: "If you have a bag to check, please proceed to your airline's check-in and bag-drop area. If not, go to security screening.",
    fr: "Si vous avez un bagage à enregistrer, veuillez vous rendre au comptoir d’enregistrement et de dépôt des bagages de votre compagnie aérienne. Sinon, allez au contrôle de sécurité.",
  },
  '3.1': {
    code: '3.1', src: '/lsq/lsq-3-1.mp4', ykfCore: true,
    en: 'Please have your boarding pass and passport or ID ready.',
    fr: "Veuillez préparer votre carte d’embarquement et votre passeport ou pièce d’identité.",
  },
  '3.2.a': {
    code: '3.2.a', src: '/lsq/lsq-3-2a.mp4', ykfCore: true,
    en: 'Take out all electronics, including laptops, phones and smartwatches, and place them in a tray.',
    fr: "Sortez tous les appareils électroniques, y compris les ordinateurs portables, téléphones et montres intelligentes, et placez-les dans un bac.",
  },
  '3.3': {
    code: '3.3', src: '/lsq/lsq-3-3.mp4',
    en: 'Remove all liquids, aerosols and gels from your luggage for inspection. Follow the current screening instructions.',
    fr: "Retirez les liquides, aérosols et gels de vos bagages pour l’inspection. Suivez les instructions de contrôle en vigueur.",
  },
  '3.4': {
    code: '3.4', src: '/lsq/lsq-3-4.mp4',
    en: 'Place liquids in a clear plastic bag in the tray. Follow the current screening limits.',
    fr: "Placez les liquides dans un sac en plastique transparent dans le bac. Suivez les limites de contrôle en vigueur.",
  },
  '3.5': {
    code: '3.5', src: '/lsq/lsq-3-5.mp4', ykfCore: true,
    en: 'Place your bag flat on the belt.',
    fr: "Placez votre sac à plat sur le tapis.",
  },
  '3.6': {
    code: '3.6', src: '/lsq/lsq-3-6.mp4', ykfCore: true,
    en: 'Please empty your pockets and place bulky jackets in the trays.',
    fr: "Veuillez vider vos poches et placer les manteaux volumineux dans les bacs.",
  },
  '3.7': {
    code: '3.7', src: '/lsq/lsq-3-7.mp4', futureOnly: true,
    en: 'Remove your shoes and place them in a separate tray.',
    fr: "Retirez vos chaussures et placez-les dans un bac séparé.",
  },
  '3.8': {
    code: '3.8', src: '/lsq/lsq-3-8.mp4', ykfCore: true,
    en: 'Keep your boarding pass with you.',
    fr: "Gardez votre carte d’embarquement avec vous.",
  },
  '4.1': {
    code: '4.1', src: '/lsq/lsq-4-1.mp4', ykfCore: true,
    en: 'Please proceed to your gate. Your gate number is shown below. Please wait in the gate area.',
    fr: "Veuillez vous rendre à votre porte d’embarquement. Le numéro de votre porte est indiqué ci-dessous. Veuillez attendre dans la zone de la porte.",
  },
  '4.2': {
    code: '4.2', src: '/lsq/lsq-4-2.mp4', ykfCore: true,
    en: 'We are now boarding passengers who need assistance and families with young children. Please come to the gate.',
    fr: "Nous invitons maintenant à embarquer les passagers qui ont besoin d’aide et les familles avec de jeunes enfants. Veuillez vous présenter à la porte.",
  },
  '4.3': {
    code: '4.3', src: '/lsq/lsq-4-3.mp4',
    en: 'We are now boarding priority passengers. Please come to the gate.',
    fr: "Nous invitons maintenant les passagers prioritaires à embarquer. Veuillez vous présenter à la porte.",
  },
  '4.4': {
    code: '4.4', src: '/lsq/lsq-4-4.mp4', futureOnly: true,
    en: 'Boarding has begun. Groups are called in order. Please have your boarding pass ready.',
    fr: "L’embarquement a commencé. Les groupes sont appelés dans l’ordre. Veuillez préparer votre carte d’embarquement.",
  },
  '4.5': {
    code: '4.5', src: '/lsq/lsq-4-5.mp4', ykfCore: true,
    en: 'We are now boarding all passengers. Please come to the gate and have your boarding pass ready.',
    fr: "Nous invitons maintenant tous les passagers à embarquer. Veuillez vous présenter à la porte et préparer votre carte d’embarquement.",
  },
  '4.6': {
    code: '4.6', src: '/lsq/lsq-4-6.mp4', ykfCore: true,
    en: 'This is the final call for this flight. Please go to the gate immediately. The gate will close soon.',
    fr: "Ceci est le dernier appel pour ce vol. Veuillez vous rendre immédiatement à la porte. La porte fermera bientôt.",
  },
  '5.1': {
    code: '5.1', src: '/lsq/lsq-5-1.mp4', ykfCore: true,
    en: 'This flight is delayed. The new departure time is shown below. Please stay near the gate area.',
    fr: "Ce vol est retardé. La nouvelle heure de départ est indiquée ci-dessous. Veuillez rester près de la zone de la porte.",
  },
  '5.2': {
    code: '5.2', src: '/lsq/lsq-5-2.mp4',
    en: 'This flight is delayed. The new departure time is not yet known. Please stay in the gate area and watch for updates.',
    fr: "Ce vol est retardé. La nouvelle heure de départ n’est pas encore connue. Veuillez rester dans la zone de la porte et surveiller les mises à jour.",
  },
  '5.3': {
    code: '5.3', src: '/lsq/lsq-5-3.mp4',
    en: 'This flight is delayed further. The updated departure time is shown below. Thank you for your patience.',
    fr: "Ce vol subit un retard supplémentaire. L’heure de départ mise à jour est indiquée ci-dessous. Merci de votre patience.",
  },
  '5.4': {
    code: '5.4', src: '/lsq/lsq-5-4.mp4', ykfCore: true,
    en: 'The gate for this flight has changed. The new gate is shown below. Please go to the new gate now.',
    fr: "La porte de ce vol a changé. La nouvelle porte est indiquée ci-dessous. Veuillez vous rendre à la nouvelle porte maintenant.",
  },
  '5.5': {
    code: '5.5', src: '/lsq/lsq-5-5.mp4', ykfCore: true,
    en: "This flight has been cancelled. Please go to your airline's service desk. Staff will help you rebook.",
    fr: "Ce vol a été annulé. Veuillez vous rendre au comptoir de service de votre compagnie aérienne. Le personnel vous aidera à effectuer une nouvelle réservation.",
  },
  '5.6': {
    code: '5.6', src: '/lsq/lsq-5-6.mp4', ykfCore: true,
    en: "We are calling a passenger. The passenger's name is shown below. If this is you, please come to the gate.",
    fr: "Nous appelons un passager. Le nom du passager est indiqué ci-dessous. Si c’est vous, veuillez vous présenter à la porte.",
  },
};

const ASL_AVAILABLE_CODES = new Set([
  '1', '2', '3.1', '3.2.a', '3.5', '3.6', '3.8',
  '4.1', '4.5', '4.6', '5.1', '5.4', '5.5', '5.6',
]);

export const ASL_ANNOUNCEMENTS: Record<string, AnnouncementMedia> = Object.fromEntries(
  Object.entries(LSQ_ANNOUNCEMENTS).map(([code, item]) => [
    code,
    {
      ...item,
      src: ASL_AVAILABLE_CODES.has(code) ? `/asl/asl-${code.replace(/\./g, '-')}.mp4` : '',
    },
  ]),
);

export const lsqMedia = (code: string) => LSQ_ANNOUNCEMENTS[code];
export const aslMedia = (code: string) => ASL_ANNOUNCEMENTS[code];
export const signMedia = (code: string, mode: 'asl' | 'lsq') =>
  mode === 'lsq' ? lsqMedia(code) : aslMedia(code);
