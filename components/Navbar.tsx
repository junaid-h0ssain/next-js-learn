import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <header>
        <nav>
            <Link href="/" className="logo">
                <Image src="/icons/logo.png" alt="Logo" width={50} height={50} />
                <p>Event</p>
            </Link>

            <ul className='text-amber-50'>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/login">Login</Link>
                <Link href="/events">Events</Link>
                <Link href="/create-events">Create Events</Link>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar