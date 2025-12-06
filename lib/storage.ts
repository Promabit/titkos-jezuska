import type { PicksData, Pick } from './types';

const inMemoryData: PicksData = { picks: [] };

export function loadPicks(): PicksData {
  return inMemoryData;
}

export function savePick(pick: Pick): void {
  inMemoryData.picks.push(pick);
}

export function getPickForParticipant(name: string): Pick | null {
  const pick = inMemoryData.picks.find(p => p.giver === name);
  return pick || null;
}

export function getAllTakenReceivers(): string[] {
  return inMemoryData.picks.map(p => p.receiver);
}

export function getCompleteAssignment(): Record<string, string> | null {
  return inMemoryData.completeAssignment || null;
}

export function saveCompleteAssignment(assignment: Record<string, string>): void {
  inMemoryData.completeAssignment = assignment;
}

export function clearAllData(): void {
  inMemoryData.picks = [];
  delete inMemoryData.completeAssignment;
}
