import { isValidParticipant } from './config';
import { getPickForParticipant, savePick, getCompleteAssignment, saveCompleteAssignment } from './storage';
import { generateCompleteAssignment } from './assignment-algorithm';
import type { SpinResponse, Pick } from './types';

export function performSpin(participantName: string): SpinResponse {
  if (!isValidParticipant(participantName)) {
    return {
      success: false,
      error: 'Érvénytelen résztvevő név',
      errorCode: 'INVALID_PARTICIPANT'
    };
  }

  const existingPick = getPickForParticipant(participantName);
  if (existingPick) {
    return {
      success: false,
      error: `Már pörgetett! A kiválasztott személy: ${existingPick.receiver}`,
      errorCode: 'ALREADY_PICKED',
      receiver: existingPick.receiver
    };
  }

  let assignment = getCompleteAssignment();

  if (!assignment) {
    assignment = generateCompleteAssignment();

    if (!assignment) {
      return {
        success: false,
        error: 'Nem sikerült érvényes hozzárendelést generálni a megadott kizárási szabályokkal',
        errorCode: 'INVALID_EXCLUSIONS'
      };
    }

    saveCompleteAssignment(assignment);
  }

  const receiver = assignment[participantName];

  if (!receiver) {
    return {
      success: false,
      error: 'Hiba történt a hozzárendelés betöltésekor',
      errorCode: 'INVALID_PARTICIPANT'
    };
  }

  const pick: Pick = {
    giver: participantName,
    receiver: receiver,
    timestamp: new Date().toISOString()
  };

  savePick(pick);

  return {
    success: true,
    receiver: receiver
  };
}

