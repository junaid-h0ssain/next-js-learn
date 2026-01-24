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
      <div className='flex flex-row gap-2'>
        <Image src="/icons/pin.svg" alt="Location" width={14} height={14} />
        <p>{location}</p>
      </div>
      <div className='datetime'>
        <Image src="/icons/calendar.svg" alt="Date" width={14} height={14} />
        <p>{date} at {time}</p>
      </div>
      <p className='description'>{description}</p>
      <h3 className='title mt-7 mb-7'>{title}</h3>
    </Link>
  )
}

export default EventCard