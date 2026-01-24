

export interface Event {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
    description: string;
}

export const events: Event[] = [
    {
        image: '/images/event1.png',
        title: 'Summer Music Festival',
        slug: 'summer-music-festival',
        location: 'Central Park, New York',
        date: '2024-07-15',
        time: '18:00',
        description: 'Join us for an unforgettable evening of live music featuring top indie and electronic artists. Featuring food trucks, craft beverages, and dancing under the stars.'
    },
    {
        image: '/images/event2.png',
        title: 'Tech Innovation Summit',
        slug: 'tech-innovation-summit',
        location: 'San Francisco Convention Center, California',
        date: '2024-08-20',
        time: '09:00',
        description: 'Discover cutting-edge technology and network with industry leaders. Features keynote speakers, workshops, and hands-on demonstrations of AI and blockchain innovations.'
    },
    {
        image: '/images/event3.png',
        title: 'Food & Wine Gala',
        slug: 'food-wine-gala',
        location: 'The Grand Hotel, Los Angeles',
        date: '2024-09-10',
        time: '19:30',
        description: 'Experience an exquisite evening of gourmet cuisine paired with premium wines from around the world. Enjoy live jazz performances and networking with food enthusiasts.'
    },
    {
        image: '/images/event4.png',
        title: 'Digital Marketing Workshop',
        slug: 'digital-marketing-workshop',
        location: 'Tech Hub Downtown, Seattle',
        date: '2024-10-05',
        time: '10:00',
        description: 'Master the latest digital marketing strategies from industry experts. Learn SEO, social media marketing, and data analytics in this comprehensive all-day workshop.'
    },
    {
        image: '/images/event5.png',
        title: 'Charity Run Marathon',
        slug: 'charity-run-marathon',
        location: 'Boston Public Park, Massachusetts',
        date: '2024-10-22',
        time: '07:00',
        description: 'Join thousands of runners in this 26-mile marathon benefiting local youth programs. All proceeds support education initiatives in underserved communities.'
    },
    {
        image: '/images/event6.png',
        title: 'Art & Design Exhibition',
        slug: 'art-design-exhibition',
        location: 'Modern Art Museum, Chicago',
        date: '2024-11-08',
        time: '11:00',
        description: 'Explore contemporary art installations and design showcases from emerging and established artists. Featuring interactive exhibits, artist meet-and-greets, and curated gallery tours.'
    }
];