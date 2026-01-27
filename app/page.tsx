import ExploreBtn from '@/components/ExploreBtn';
import EventCard from '@/components/EventCard';
import { events as staticEvents } from '@/lib/events';
import { IEvent } from '@/database/event.model';

export default async function Home() {
  let events: IEvent[] = [];

  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${BASE_URL}/api/events`, { cache: 'no-store' });
    
    if (res.ok) {
      const data = await res.json();
      events = data.events || [];
    } else {
      console.error('Failed to fetch events:', res.status, res.statusText);
      // Fall back to static events
      events = staticEvents as IEvent[];
    }
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

