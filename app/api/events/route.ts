import connectDB from '@/lib/mongodb';
import { Event } from '@/database';
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';


export async function POST(request: NextRequest) {
    try {
        await connectDB();

        // Ensure Cloudinary is configured with latest env vars
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
            api_key: process.env.CLOUDINARY_API_KEY?.trim(),
            api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
            secure: true
        });

        const config = cloudinary.config();
        console.log('--- Cloudinary Diagnostics ---');
        console.log('Cloud Name:', config.cloud_name);
        console.log('API Key:', config.api_key);
        console.log('API Secret (Last 4):', config.api_secret ? `****${config.api_secret.slice(-4)}` : 'MISSING');
        console.log('------------------------------');

        if (!config.cloud_name || !config.api_key || !config.api_secret) {
            return NextResponse.json({ error: 'Cloudinary credentials missing in .env.local' }, { status: 500 });
        }

        const formData = await request.formData();
        const eventRaw = Object.fromEntries(formData.entries());

        console.log('Received payload:', eventRaw);

        // Robust array parsing
        const processedEvent: any = {
            ...eventRaw,
            agenda: typeof eventRaw.agenda === 'string' ? eventRaw.agenda.split(';').filter(Boolean).map(s => s.trim()) : (Array.isArray(eventRaw.agenda) ? eventRaw.agenda : []),
            tags: typeof eventRaw.tags === 'string' ? eventRaw.tags.split(';').filter(Boolean).map(s => s.trim()) : (Array.isArray(eventRaw.tags) ? eventRaw.tags : []),
        };

        const file = formData.get('image') as unknown as File | Blob;

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ error: 'Valid image file is required' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary Upload Error Details:', error);
                        reject(error);
                    } else {
                        resolve(result as { secure_url: string; public_id: string });
                    }
                }
            );
            uploadStream.end(buffer);
        });

        processedEvent.image = uploadResult.secure_url;
        const createdEvent = await Event.create(processedEvent);

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
    }
    catch (error: any) {
        console.error('API Error:', error);

        if (error.http_code === 401) {
            return NextResponse.json({
                error: 'Cloudinary Authentication Failed',
                details: 'The Credentials in .env.local do not match yours. Please verify your API Key and Secret in the Cloudinary dashboard.',
                message: error.message
            }, { status: 401 });
        }

        return NextResponse.json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function GET() {
    return new Response('You are in /api/events');
}