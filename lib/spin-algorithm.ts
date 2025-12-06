import { BUILD_TIME_ASSIGNMENT } from "./assignment-algorithm";
import { isValidParticipant } from "./config";
import { getPickForParticipant, savePick } from "./storage";
import type { Pick, SpinResponse } from "./types";

export function performSpin(participantName: string): SpinResponse {
  if (!isValidParticipant(participantName)) {
    return {
      success: false,
      error: "Érvénytelen résztvevő név",
      errorCode: "INVALID_PARTICIPANT",
    };
  }

  const existingPick = getPickForParticipant(participantName);
  if (existingPick) {
    return {
      success: false,
      error: `Már pörgetett! A kiválasztott személy: ${existingPick.receiver}`,
      errorCode: "ALREADY_PICKED",
      receiver: existingPick.receiver,
    };
  }

  const receiver = BUILD_TIME_ASSIGNMENT[participantName];

  const pick: Pick = {
    giver: participantName,
    receiver: receiver,
    timestamp: new Date().toISOString(),
  };

  savePick(pick);

  return {
    success: true,
    receiver: receiver,
  };
}
