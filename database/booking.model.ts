import { Schema, model, models, InferSchemaType, Types } from "mongoose";

/* ------------------ */
/* Schema             */
/* ------------------ */

const BookingSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(email: string) {
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return emailRegex.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  { timestamps: true },
);

/* ------------------ */
/* Types              */
/* ------------------ */

export type BookingType = InferSchemaType<typeof BookingSchema>;

/* ------------------ */
/* Pre Save Hook      */
/* ------------------ */

BookingSchema.pre("save", async function () {
  if (this.isModified("eventId") || this.isNew) {
    const EventModel = models.Event;

    if (!EventModel) {
      throw new Error("Event model is not registered");
    }

    const eventExists = await EventModel.findById(
      this.eventId as Types.ObjectId,
    ).select("_id");

    if (!eventExists) {
      const error = new Error(`Event with ID ${this.eventId} does not exist`);
      error.name = "ValidationError";
      throw error;
    }
  }
});

/* ------------------ */
/* Indexes            */
/* ------------------ */

BookingSchema.index({ eventId: 1 });
BookingSchema.index({ eventId: 1, createdAt: -1 });
BookingSchema.index({ email: 1 });
BookingSchema.index(
  { eventId: 1, email: 1 },
  { unique: true, name: "uniq_event_email" },
);

/* ------------------ */
/* Model Export       */
/* ------------------ */

export const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
