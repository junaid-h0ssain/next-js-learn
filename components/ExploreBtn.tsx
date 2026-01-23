'use client';
import React from 'react'
import Image from 'next/image'

interface ExploreBtnProps {}

const ExploreBtn: React.FC<ExploreBtnProps> = () => {
    return (
        <button type='button' id='explore-btn' className='mt-7 mx-auto' onClick={ () => console.log('Explore button clicked!')}>
            <a href="#events">Explore Now!
                <Image src="/icons/arrow-down.svg" alt="Explore Icon" width={20} height={20} />
            </a>
        </button>
    )
}

export default ExploreBtn