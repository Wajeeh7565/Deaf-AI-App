export const getOfficialFlightStatusUrl = (airline: string): string => {
  if (airline.includes('WestJet')) return 'https://www.westjet.com/en-ca/flights/status';
  if (airline.includes('Flair')) return 'https://flightstatus.flyflair.com/';
  if (airline.includes('Air Canada')) return 'https://www.aircanada.com/ca/en/aco/home/fly/flight-information.html';
  // Sunwing scheduled flying is now operated within the WestJet Group; use WestJet status as the safest official handoff.
  if (airline.includes('Sunwing')) return 'https://www.westjet.com/en-ca/flights/status';
  return 'https://www.waterlooairport.ca/flights/arrivals-and-departures/';
};
