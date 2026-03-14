import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body) {
      return Response.json({
        success: false,
        message: "No data received",
      });
    }

    await connectDB();

    const user = await User.create(body);

    return Response.json({
      success: true,
      user,
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}