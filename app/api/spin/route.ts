import { NextRequest, NextResponse } from 'next/server';
import { performSpin } from '@/lib/spin-algorithm';
import type { SpinRequest, SpinResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: SpinRequest = await request.json();
    const { participantName } = body;

    if (!participantName || typeof participantName !== 'string') {
      return NextResponse.json<SpinResponse>(
        {
          success: false,
          error: 'Érvénytelen kérés',
          errorCode: 'INVALID_PARTICIPANT'
        },
        { status: 400 }
      );
    }

    const result = performSpin(participantName);

    if (!result.success) {
      return NextResponse.json<SpinResponse>(result, { status: 400 });
    }

    return NextResponse.json<SpinResponse>(result);
  } catch (error) {
    console.error('Error during spin:', error);
    return NextResponse.json<SpinResponse>(
      {
        success: false,
        error: 'Szerver hiba történt',
        errorCode: 'INVALID_PARTICIPANT'
      },
      { status: 500 }
    );
  }
}
