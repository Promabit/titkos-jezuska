import fs from 'fs';
import path from 'path';
import type { SecretSantaConfig, ParticipantConfig } from './types';

let cachedConfig: SecretSantaConfig | null = null;

export function loadConfig(): SecretSantaConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const configPath = path.join(process.cwd(), 'config', 'participants.json');

  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found at ${configPath}`);
  }

  try {
    const fileContents = fs.readFileSync(configPath, 'utf-8');
    const config: SecretSantaConfig = JSON.parse(fileContents);

    validateConfig(config);

    cachedConfig = config;
    return config;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in config file: ${error.message}`);
    }
    throw error;
  }
}

export function validateConfig(config: SecretSantaConfig): void {
  if (!config.participants || !Array.isArray(config.participants)) {
    throw new Error('Config must have a "participants" array');
  }

  if (config.participants.length === 0) {
    throw new Error('Participants array cannot be empty');
  }

  const names = new Set<string>();

  for (const participant of config.participants) {
    if (!participant.name || typeof participant.name !== 'string') {
      throw new Error('Each participant must have a valid "name" string');
    }

    if (names.has(participant.name)) {
      throw new Error(`Duplicate participant name: "${participant.name}"`);
    }

    names.add(participant.name);

    if (!Array.isArray(participant.cannotPickNames)) {
      throw new Error(`Participant "${participant.name}" must have a "cannotPickNames" array`);
    }

    if (participant.cannotPickNames.includes(participant.name)) {
      throw new Error(`Participant "${participant.name}" cannot have self-exclusion`);
    }
  }

  for (const participant of config.participants) {
    for (const excludedName of participant.cannotPickNames) {
      if (!names.has(excludedName)) {
        throw new Error(
          `Participant "${participant.name}" has invalid exclusion: "${excludedName}" is not a participant`
        );
      }
    }
  }
}

export function getParticipantNames(): string[] {
  const config = loadConfig();
  return config.participants.map(p => p.name).sort();
}

export function getExclusions(participantName: string): string[] {
  const config = loadConfig();
  const participant = config.participants.find(p => p.name === participantName);

  if (!participant) {
    throw new Error(`Participant "${participantName}" not found in config`);
  }

  return participant.cannotPickNames;
}

export function isValidParticipant(name: string): boolean {
  const config = loadConfig();
  return config.participants.some(p => p.name === name);
}
