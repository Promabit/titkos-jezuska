import { NextResponse } from 'next/server';
import { loadPicks } from '@/lib/storage';

export async function GET() {
  try {
    const picksData = loadPicks();
    const whoSpun = picksData.picks.map(p => p.giver);

    return NextResponse.json({ whoSpun });
  } catch (error) {
    console.error('Error loading who spun:', error);
    return NextResponse.json(
      { error: 'Szerver hiba történt' },
      { status: 500 }
    );
  }
}
