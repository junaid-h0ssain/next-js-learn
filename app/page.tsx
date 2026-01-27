import ExploreBtn from '@/components/ExploreBtn';
import EventCard from '@/components/EventCard';
// import {events} from '@/lib/events';
import { IEvent } from '@/database/event.model';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function Home() {
  const res = await fetch(`${BASE_URL}/api/events`, {cache: 'no-store'});
  const {events} = await res.json();
  console.log('Fetched events data:');

  return (
    <div>
      <section>
        <h1 className='text-center mt-10'>Welcome to My Next.js App. Now dance</h1>

        <p className='text-center mt-5'>Enjoy fun events and activities with us!</p>

        <ExploreBtn/>

        <div className='mt-20 space-y-7 text-amber-50'>
          <h3>Features Events</h3>

          <ul className='events'>
            {events.map((event: IEvent) => (
              <li key={event.title} className='event-item'>
                <EventCard {...event}/>
              </li>
            ))}
          </ul>
        </div>
      
      </section>

      
      
    </div>
  );
}

