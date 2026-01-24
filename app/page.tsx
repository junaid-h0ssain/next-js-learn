import React from 'react';
import Hello from '../components/hello';
import ExploreBtn from '@/components/ExploreBtn';
import EventCard from '@/components/EventCard';
import {events} from '@/lib/events';

export default function Home() {
  return (
    <div>
      <section>
        <h1 className='text-center mt-10'>Welcome to My Next.js App. Now dance</h1>

        <p className='text-center mt-5'>Enjoy fun events and activities with us!</p>

        <ExploreBtn/>

        <div className='mt-20 space-y-7 text-amber-50'>
          <h3>Features Events</h3>

          <ul className='events'>
            {events.map((event) => (
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

