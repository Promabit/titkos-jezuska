import { NextResponse } from 'next/server';
import { getStoragePath } from '@/lib/storage';
import fs from 'fs';
import lockfile from 'proper-lockfile';

export async function POST() {
  try {
    const storagePath = getStoragePath();

    let release: (() => void) | null = null;
    try {
      release = lockfile.lockSync(storagePath);

      const emptyData = { picks: [] };
      fs.writeFileSync(storagePath, JSON.stringify(emptyData, null, 2), 'utf-8');

      return NextResponse.json({
        success: true,
        message: 'A játék újraindult! Minden választás törölve.'
      });
    } finally {
      if (release) {
        release();
      }
    }
  } catch (error) {
    console.error('Error resetting picks:', error);
    return NextResponse.json(
      { success: false, error: 'Hiba történt a törlés során' },
      { status: 500 }
    );
  }
}
