import connectDB from '@/lib/mongodb';
import { Event } from '@/database';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const formData = await request.formData();
        let event;
        try {
            event = Object.fromEntries(formData.entries());
        }
        catch (error) {
            console.error('Error parsing form data:', error);
            return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
        }

        console.log('Received event data:', event);

        const createdEvent = await Event.create(event);

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
    }
    catch (error) {
        console.error('Error handling POST request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    return new Response('Handle GET request for /api/events');
}