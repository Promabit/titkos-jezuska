import { NextResponse } from 'next/server';
import { getParticipantNames } from '@/lib/config';
import type { ParticipantsResponse } from '@/lib/types';

export async function GET() {
  try {
    const participants = getParticipantNames();

    return NextResponse.json<ParticipantsResponse>({ participants });
  } catch (error) {
    console.error('Error loading participants:', error);
    return NextResponse.json(
      { error: 'Nem sikerült betölteni a résztvevőket' },
      { status: 500 }
    );
  }
}
