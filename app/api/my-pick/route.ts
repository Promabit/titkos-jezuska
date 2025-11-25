import { NextRequest, NextResponse } from 'next/server';
import { getPickForParticipant } from '@/lib/storage';
import type { MyPickResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json(
        { error: 'Hiányzó név paraméter' },
        { status: 400 }
      );
    }

    const pick = getPickForParticipant(name);

    if (pick) {
      return NextResponse.json<MyPickResponse>({
        hasPicked: true,
        receiver: pick.receiver,
        timestamp: pick.timestamp
      });
    }

    return NextResponse.json<MyPickResponse>({ hasPicked: false });
  } catch (error) {
    console.error('Error fetching pick:', error);
    return NextResponse.json(
      { error: 'Szerver hiba történt' },
      { status: 500 }
    );
  }
}
