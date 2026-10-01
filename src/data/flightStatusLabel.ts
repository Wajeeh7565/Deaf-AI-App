import { FlightStatus, TextLanguageCode } from '../types';
const labels: Record<FlightStatus, [string, string, string]> = {
  'On Time': ['On time', 'À l’heure', 'A tiempo'],
  Delayed: ['Delayed', 'Retard', 'Retraso'],
  Boarding: ['Boarding', 'Embarquement', 'Embarque'],
  'Final Call': ['Final call', 'Dernier appel', 'Última llamada'],
  Cancelled: ['Cancelled', 'Annulé', 'Cancelado'],
};
export const flightStatusLabel = (status: FlightStatus, language: TextLanguageCode) =>
  labels[status]?.[language === 'fr' ? 1 : language === 'es' ? 2 : 0] ?? status;
