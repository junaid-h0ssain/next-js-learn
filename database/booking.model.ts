import mongoose, { Document, Schema, CallbackWithoutResultAndOptionalError } from 'mongoose';
import Event from './event.model';

// Interface for the Booking document
export interface IBooking extends Document {
    eventId: mongoose.Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

// Booking schema definition
const bookingSchema = new Schema<IBooking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: [true, 'Event ID is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            validate: {
                validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
                message: 'Invalid email format',
            },
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Index on eventId for faster queries
bookingSchema.index({ eventId: 1 });

// Pre-save hook to verify that the referenced event exists
bookingSchema.pre('save', function(next) {
  Event.findById(this.eventId).then((event) => {
    if (!event) {
      // @ts-ignore
      return next(new Error('Referenced event does not exist.'));
    }
    // @ts-ignore
    next();
  // @ts-ignore
  }).catch(next);
});

// Create and export the Booking model
const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;