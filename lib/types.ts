export interface ParticipantConfig {
  name: string;
  cannotPickNames: string[];
}

export interface SecretSantaConfig {
  participants: ParticipantConfig[];
}

export interface Pick {
  giver: string;
  receiver: string;
  timestamp: string;
}

export interface PicksData {
  picks: Pick[];
  completeAssignment?: Record<string, string>;
}

export interface SpinRequest {
  participantName: string;
}

export interface SpinResponse {
  success: boolean;
  receiver?: string;
  error?: string;
  errorCode?: 'ALREADY_PICKED' | 'NO_AVAILABLE_PICKS' | 'INVALID_PARTICIPANT' | 'INVALID_EXCLUSIONS';
}

export interface ParticipantsResponse {
  participants: string[];
}

export interface MyPickResponse {
  hasPicked: boolean;
  receiver?: string;
  timestamp?: string;
}
