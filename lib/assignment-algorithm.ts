import { getParticipantNames, getExclusions } from "./config";

function tryGenerateAssignment(
  participants: string[],
): Record<string, string> | null {
  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  const assignment: Record<string, string> = {};
  const taken = new Set<string>();

  for (const giver of shuffled) {
    const exclusions = getExclusions(giver);
    const available = participants.filter((receiver) => {
      if (receiver === giver) return false;
      if (exclusions.includes(receiver)) return false;
      if (taken.has(receiver)) return false;
      return true;
    });

    if (available.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    const receiver = available[randomIndex];

    assignment[giver] = receiver;
    taken.add(receiver);
  }

  return assignment;
}

function generateAssignmentAtBuildTime(): Record<string, string> {
  const participants = getParticipantNames();
  const maxAttempts = 1000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const assignment = tryGenerateAssignment(participants);
    if (assignment) {
      return assignment;
    }
  }

  throw new Error("Failed to generate valid assignment after 1000 attempts");
}

export const BUILD_TIME_ASSIGNMENT: any = {
  Ádám: "János",
  János: "Mari mama",
  "Mari mama": "Ádám",
  "Nagy Klau": "Noémi",
  "Kis Klau": "Janesz",
  Janesz: "Kis Klau",
  Noémi: "Nagy Klau",
};
