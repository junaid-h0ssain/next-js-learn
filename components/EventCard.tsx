'use client';
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';

interface ScriptProps {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
    description: string;
}

const EventCard = ({title, image, slug, location, date, time, description}: ScriptProps) => {
  return (
    <Link href={`/events/${slug}`} id='event-card'>
      <Image src={image} alt={title} width={400} height={300} className='rounded-lg poster'/>
      <p className='location'>{location}</p>
      <p className='date-time'>{date} at {time}</p>
      <p className='description'>{description}</p>
      <h3 className='title mt-7 mb-7'>{title}</h3>
    </Link>
  )
}

export default EventCard