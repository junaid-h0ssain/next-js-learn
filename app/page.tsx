import React from 'react';
import Hello from '../components/hello';
import ExploreBtn from '@/components/ExploreBtn';

export default function Home() {
  return (
    <div>
      <section>
        <h1 className='text-center mt-10'>Welcome to My Next.js App. Now dance</h1>

        <p className='text-center mt-5'>Enjoy fun events and activities with us!</p>

        <ExploreBtn/>

        <div className='mt-20 space-y-7 text-amber-200'>
          <h3>Features Events</h3>

          <ul className='events'>
            {[1, 2, 3, 4, 5].map((event) => (
              <li key={event} className='event-item'>
                <h4>Event Title {event}</h4>
                <p>This is a description for event number {event}.</p>
              </li>
            ))}
          </ul>
        </div>
      
      </section>

      
      
    </div>
  );
}

