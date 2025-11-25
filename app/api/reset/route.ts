import { NextResponse } from 'next/server';
import { getStoragePath } from '@/lib/storage';
import fs from 'fs';

export async function POST() {
  try {
    const storagePath = getStoragePath();

    const emptyData = { picks: [] };
    fs.writeFileSync(storagePath, JSON.stringify(emptyData, null, 2), 'utf-8');

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
