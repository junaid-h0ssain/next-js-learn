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

        // Parse arrays from semicolon-separated strings
        const processedEvent = {
            ...event,
            agenda: typeof event.agenda === 'string' ? event.agenda.split(';').map((s: string) => s.trim()) : event.agenda,
            tags: typeof event.tags === 'string' ? event.tags.split(';').map((s: string) => s.trim()) : event.tags,
        };

        const createdEvent = await Event.create(processedEvent);

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
    }
    catch (error: unknown) {
        console.error('Error handling POST request:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Internal Server Error', details: message }, { status: 500 });
    }
}

export async function GET() {
    return new Response('You are in /api/events');
}