import ExploreBtn from '@/components/ExploreBtn';
import EventCard from '@/components/EventCard';
import { events as staticEvents } from '@/lib/events';
import { IEvent } from '@/database/event.model';
import connectDB from '@/lib/mongodb';
import { Event } from '@/database';

export default async function Home() {
  let events: IEvent[] = [];

  try {
    await connectDB();
    const dbEvents = await Event.find().sort({ createdAt: -1 }).lean();
    // Convert MongoDB documents to plain objects with serializable data
    events = dbEvents.map(event => ({
      ...event,
      _id: event._id.toString(),
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    })) as IEvent[];
  } catch (error) {
    console.error('Error fetching events:', error);
    // Fall back to static events
    events = staticEvents as IEvent[];
  }

  return (
    <div>
      <section>
        <h1 className='text-center mt-10'>Welcome to My Next.js App. Now dance</h1>

        <p className='text-center mt-5'>Enjoy fun events and activities with us!</p>

        <ExploreBtn />

        <div className='mt-20 space-y-7 text-amber-50'>
          <h3>Featured Events</h3>

          <ul className='events'>
            {events.map((event: IEvent) => (
              <li key={event.slug || event.title} className='event-item'>
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        </div>

      </section>
    </div>
  );
}

