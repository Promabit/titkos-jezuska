import { NextResponse } from 'next/server';
import { clearAllData } from '@/lib/storage';

export async function POST() {
  try {
    clearAllData();

    return NextResponse.json({
      success: true,
      message: 'A játék újraindult! Minden választás törölve.'
    });
  } catch (error) {
    console.error('Error resetting picks:', error);
    return NextResponse.json(
      { success: false, error: 'Hiba történt a törlés során' },
      { status: 500 }
    );
  }
}
