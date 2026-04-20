import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Visitor from "../../../models/Visitor";

export async function GET() {
  try {
    await connectDB();
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await new Visitor({ count: 389 }).save();
    }
    // Return at least 389 as the "seeded" starting point
    const count = Math.max(visitor.count, 389);
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch views" }, { status: 500 });
  }
}

export async function POST() {
  try {
    await connectDB();
    let visitor = await Visitor.findOne();
    if (!visitor) {
      // First visit after seed starts at 390
      visitor = await new Visitor({ count: 390 }).save();
    } else {
      // Ensure the count doesn't stay below the requested 389 seeding
      if (visitor.count < 389) visitor.count = 389;
      visitor.count += 1;
      await visitor.save();
    }
    return NextResponse.json({ count: visitor.count });
  } catch (error) {
    return NextResponse.json({ error: "Failed to increment views" }, { status: 500 });
  }
}
