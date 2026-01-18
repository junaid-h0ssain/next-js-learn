import React from 'react';
import Hello from '../components/hello';

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Next.js App. Now dance</h1>
      <Hello />

      <a href="/about">
        <button>go to about</button>
      </a>
      
    </div>
  );
}

