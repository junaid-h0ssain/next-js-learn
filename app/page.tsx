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
      
      </section>

      
      
    </div>
  );
}

