import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import type { PicksData, Pick } from './types';

export function getStoragePath(): string {
  const projectRoot = process.cwd();
  const hash = crypto
    .createHash('md5')
    .update(projectRoot)
    .digest('hex')
    .substring(0, 8);

  return path.join(os.tmpdir(), `secret-santa-${hash}`, 'picks.json');
}

export function initializeStorage(): void {
  const storagePath = getStoragePath();
  const storageDir = path.dirname(storagePath);

  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  if (!fs.existsSync(storagePath)) {
    const initialData: PicksData = { picks: [] };
    fs.writeFileSync(storagePath, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

export function loadPicks(): PicksData {
  const storagePath = getStoragePath();

  try {
    initializeStorage();

    const fileContents = fs.readFileSync(storagePath, 'utf-8');
    const data: PicksData = JSON.parse(fileContents);

    if (!data.picks || !Array.isArray(data.picks)) {
      console.warn('Invalid picks data, reinitializing storage');
      const initialData: PicksData = { picks: [] };
      fs.writeFileSync(storagePath, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }

    return data;
  } catch (error) {
    console.error('Error loading picks, reinitializing:', error);
    const initialData: PicksData = { picks: [] };
    fs.writeFileSync(storagePath, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

export function savePick(pick: Pick): void {
  const storagePath = getStoragePath();
  const storageDir = path.dirname(storagePath);

  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  const currentData = loadPicks();
  currentData.picks.push(pick);

  const tempPath = `${storagePath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(currentData, null, 2), 'utf-8');
  fs.renameSync(tempPath, storagePath);
}

export function getPickForParticipant(name: string): Pick | null {
  const data = loadPicks();
  const pick = data.picks.find(p => p.giver === name);
  return pick || null;
}

export function getAllTakenReceivers(): string[] {
  const data = loadPicks();
  return data.picks.map(p => p.receiver);
}

export function getCompleteAssignment(): Record<string, string> | null {
  const data = loadPicks();
  return data.completeAssignment || null;
}

export function saveCompleteAssignment(assignment: Record<string, string>): void {
  const storagePath = getStoragePath();
  const storageDir = path.dirname(storagePath);

  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  const currentData = loadPicks();
  currentData.completeAssignment = assignment;

  const tempPath = `${storagePath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(currentData, null, 2), 'utf-8');
  fs.renameSync(tempPath, storagePath);
}
