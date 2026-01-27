import connectDB from '@/lib/mongodb';
import { Event } from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';


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

        const file = formData.get('image') as File;

        if(!file){
            return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
        }
        console.log('Received file:', file.name, file.size, file.type);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type: 'image'}, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result as { secure_url: string; public_id: string });
                }
            }).end(buffer);
        });

        event.image = (uploadResult as { secure_url: string; public_id: string }).secure_url;

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