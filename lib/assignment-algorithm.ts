import { getParticipantNames, getExclusions } from './config';

export function generateCompleteAssignment(): Record<string, string> | null {
  const participants = getParticipantNames();
  const maxAttempts = 1000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const assignment = tryGenerateAssignment(participants);
    if (assignment) {
      return assignment;
    }
  }

  return null;
}

function tryGenerateAssignment(participants: string[]): Record<string, string> | null {
  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  const assignment: Record<string, string> = {};
  const taken = new Set<string>();

  for (const giver of shuffled) {
    const exclusions = getExclusions(giver);
    const available = participants.filter(receiver => {
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

export function isValidAssignment(assignment: Record<string, string>): boolean {
  const participants = getParticipantNames();
  const receivers = new Set<string>();

  for (const giver of participants) {
    const receiver = assignment[giver];

    if (!receiver) return false;
    if (giver === receiver) return false;

    const exclusions = getExclusions(giver);
    if (exclusions.includes(receiver)) return false;

    if (receivers.has(receiver)) return false;
    receivers.add(receiver);
  }

  return receivers.size === participants.length;
}
