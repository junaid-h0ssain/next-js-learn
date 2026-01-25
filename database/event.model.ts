import mongoose, { Document, Schema, CallbackWithoutResultAndOptionalError } from 'mongoose';

// Interface for the Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // ISO date string
  time: string; // HH:MM format
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Event schema definition
const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      enum: ['online', 'offline', 'hybrid'],
      trim: true,
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Tags must contain at least one item',
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Pre-save hook for slug generation, date normalization, and validation
eventSchema.pre('save', function(next) {
  // Generate slug only if title is new or modified
  if (this.isNew || this.isModified('title')) {
    this.slug = generateSlug(this.title);
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(this.date)) {
    const parsedDate = new Date(this.date);
    if (isNaN(parsedDate.getTime())) {
      // @ts-ignore
      return next(new Error('Invalid date format. Use YYYY-MM-DD.'));
    }
    this.date = parsedDate.toISOString().split('T')[0];
  }

  // Normalize time to HH:MM format
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(this.time)) {
    // @ts-ignore
    return next(new Error('Invalid time format. Use HH:MM (24-hour).'));
  }

  // Validate required fields are non-empty
  const requiredFields: (keyof IEvent)[] = [
    'title', 'description', 'overview', 'image', 'venue', 'location', 'date', 'time', 'mode', 'audience', 'organizer'
  ];
  for (const field of requiredFields) {
    if (!this[field] || (typeof this[field] === 'string' && this[field].trim() === '')) {
      // @ts-ignore
      return next(new Error(`${field} is required and cannot be empty.`));
    }
  }

  // @ts-ignore
  next();
});

// Create and export the Event model
const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;