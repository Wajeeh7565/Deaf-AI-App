export type SignLanguageCode =
  | 'asl' | 'lsq' | 'bsl' | 'lsf' | 'auslan' | 'dgs' | 'libras' | 'jsl' | 'isl';

export type CommunicationMode = SignLanguageCode | 'text';
export type TextLanguageCode = 'en' | 'fr' | 'es';
export type TextSize = 'normal' | 'large' | 'xlarge';

export type ScreenId =
  | 'welcome' | 'visual_journey' | 'comm_preference' | 'welcome_video' | 'flight_selection'
  | 'flight_confirmation' | 'notification_opt_in' | 'checked_bag_question'
  | 'bag_drop_guidance' | 'bag_drop_completion' | 'catsa_security'
  | 'post_security_confirmation' | 'gate_dashboard' | 'route_to_gate'
  | 'gate_change_alert' | 'event_gate_change' | 'talk_with_staff' | 'settings'
  | 'event_delayed' | 'event_boarding' | 'event_final_call' | 'event_cancelled' | 'event_paging'
  | 'event_live_unavailable' | 'event_journey_complete';

export type FlightStatus = 'On Time' | 'Delayed' | 'Boarding' | 'Final Call' | 'Cancelled';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  scheduledTime: string;
  status: FlightStatus;
  gate: string;
  terminal: string;
  bagDropArea: string;
  carousel: string;
  remarks?: string;
  lastUpdated: string;
}

export interface WayfindingStep {
  stepNumber: number;
  totalSteps: number;
  title: string;
  instruction: string;
  landmark: string;
  imageUrl: string;
  aslVideoDescription: string;
  estimatedWalkingSeconds: number;
  highlightedGate?: string;
}

export interface StaffTranscriptionEntry {
  id: string;
  speaker: 'passenger' | 'staff' | 'system';
  text: string;
  timestamp: string;
  aslCaption?: string;
}

export interface LockScreenNotification {
  id: string;
  appName: string;
  title: string;
  body: string;
  timeAgo: string;
  iconType: 'gate' | 'boarding' | 'delay' | 'final_call' | 'cancel' | 'info';
  urgent?: boolean;
}

export interface AccessibilitySettings {
  commMode: CommunicationMode;
  textSize: TextSize;
  highContrast: boolean;
  hapticFeedback: boolean;
  videoSpeed: number;
  autoPlaySignVideos: boolean;
  captionsEnabled: boolean;
}
