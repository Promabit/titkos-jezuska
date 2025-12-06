import { BUILD_TIME_ASSIGNMENT } from "@/lib/assignment-algorithm";
import { loadPicks } from "@/lib/storage";
import { NextResponse } from "next/server";

export async function GET() {
  const completeAssignment = BUILD_TIME_ASSIGNMENT;
  const picksData = loadPicks();

  return NextResponse.json({
    completeAssignment,
    actualPicks: picksData.picks,
  });
}
