'use client';
import React from 'react'
import Image from 'next/image'

const ExploreBtn = () => {
    return (
        <button type='button' id='explore-btn' className='mt-7 mx-auto' onClick={ () => alert('Explore button clicked!')}>
            <a href="#events" className='text-emerald-50'>Explore Now!
                <Image src="/icons/arrow-down.svg" alt="Explore Icon" width={20} height={20} />
            </a>
        </button>
    )
}

export default ExploreBtn