import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Visitor from "../../../models/Visitor";

export async function GET() {
  try {
    await connectDB();
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await new Visitor({ count: 0 }).save();
    }
    return NextResponse.json({ count: visitor.count });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch views" }, { status: 500 });
  }
}

export async function POST() {
  try {
    await connectDB();
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await new Visitor({ count: 1 }).save();
    } else {
      visitor.count += 1;
      await visitor.save();
    }
    return NextResponse.json({ count: visitor.count });
  } catch (error) {
    return NextResponse.json({ error: "Failed to increment views" }, { status: 500 });
  }
}
