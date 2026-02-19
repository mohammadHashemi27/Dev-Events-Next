import { Schema, model, models, InferSchemaType } from "mongoose";

/* ------------------ */
/* Schema             */
/* ------------------ */

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    overview: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
      enum: ["online", "offline", "hybrid"],
    },
    audience: {
      type: String,
      required: true,
      trim: true,
    },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "At least one agenda item is required",
      },
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "At least one tag is required",
      },
    },
  },
  { timestamps: true },
);

/* ------------------ */
/* Types              */
/* ------------------ */

export type EventType = InferSchemaType<typeof EventSchema>;

/* ------------------ */
/* Pre Save Hook      */
/* ------------------ */

EventSchema.pre("save", function () {
  // Generate slug
  if (this.isModified("title") || this.isNew) {
    this.slug = generateSlug(this.title);
  }

  // Normalize date
  if (this.isModified("date")) {
    this.date = normalizeDate(this.date);
  }

  // Normalize time
  if (this.isModified("time")) {
    this.time = normalizeTime(this.time);
  }
});

/* ------------------ */
/* Helpers            */
/* ------------------ */

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  return date.toISOString().split("T")[0];
}

function normalizeTime(timeString: string): string {
  const timeRegex = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;
  const match = timeString.trim().match(timeRegex);

  if (!match) {
    throw new Error("Invalid time format. Use HH:MM or HH:MM AM/PM");
  }

  let hours = parseInt(match[1]);
  const minutes = match[2];
  const period = match[4]?.toUpperCase();

  if (period) {
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  }

  if (
    hours < 0 ||
    hours > 23 ||
    parseInt(minutes) < 0 ||
    parseInt(minutes) > 59
  ) {
    throw new Error("Invalid time values");
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

/* ------------------ */
/* Indexes            */
/* ------------------ */

EventSchema.index({ slug: 1 }, { unique: true });
EventSchema.index({ date: 1, mode: 1 });

/* ------------------ */
/* Model Export       */
/* ------------------ */

export const Event = models.Event || model("Event", EventSchema);

export default Event;
