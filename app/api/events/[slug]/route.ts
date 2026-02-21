import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

type RouteParams = {
  params: {
    slug: string;
  };
};

/**
 * GET /api/events/[slug]
 * Fetch a single event by slug
 */
export async function GET(
  _req: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = params;

    // Validate slug
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 },
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();

    const event = await Event.findOne({ slug: sanitizedSlug }).lean().exec();

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event }, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/events/[slug] error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
