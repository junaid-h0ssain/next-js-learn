import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event } from '@/database';
import { IEvent } from '@/database/event.model';

// Type for route params in Next.js 15 App Router
type RouteParams = {
    params: Promise<{ slug: string }>;
};

// Standard API response types for consistency
interface ApiSuccessResponse {
    success: true;
    data: IEvent;
}

interface ApiErrorResponse {
    success: false;
    error: {
        message: string;
        code: string;
    };
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// Slug validation regex: lowercase letters, numbers, and hyphens only
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validates the slug format
 * @param slug - The slug to validate
 * @returns boolean indicating if slug is valid
 */
function isValidSlug(slug: string): boolean {
    return (
        typeof slug === 'string' &&
        slug.length > 0 &&
        slug.length <= 200 &&
        SLUG_PATTERN.test(slug)
    );
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
    request: NextRequest,
    { params }: RouteParams
): Promise<NextResponse<ApiResponse>> {
    try {
        // Await params (required in Next.js 15)
        const { slug } = await params;

        // Validate slug presence
        if (!slug) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: 'Event slug is required',
                        code: 'MISSING_SLUG',
                    },
                },
                { status: 400 }
            );
        }

        // Validate slug format
        if (!isValidSlug(slug)) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: 'Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens.',
                        code: 'INVALID_SLUG_FORMAT',
                    },
                },
                { status: 400 }
            );
        }

        // Establish database connection
        await connectDB();

        // Query event by slug (case-insensitive for robustness)
        const event = await Event.findOne({ slug: slug.toLowerCase() }).lean<IEvent>();

        // Handle event not found
        if (!event) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: `Event with slug '${slug}' not found`,
                        code: 'EVENT_NOT_FOUND',
                    },
                },
                { status: 404 }
            );
        }

        // Return successful response with event data
        return NextResponse.json(
            {
                success: true,
                data: event,
            },
            { status: 200 }
        );
    } catch (error) {
        // Log error for debugging (in production, use proper logging service)
        console.error('[GET /api/events/[slug]] Error:', error);

        // Handle Mongoose connection errors
        if (error instanceof Error && error.message.includes('MONGODB_URI')) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: 'Database configuration error',
                        code: 'DB_CONFIG_ERROR',
                    },
                },
                { status: 500 }
            );
        }

        // Generic server error response
        return NextResponse.json(
            {
                success: false,
                error: {
                    message: 'An unexpected error occurred while fetching the event',
                    code: 'INTERNAL_SERVER_ERROR',
                },
            },
            { status: 500 }
        );
    }
}
