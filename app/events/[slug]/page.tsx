

import Image from "next/image";

import { Event } from "@/database/event.model";

const EventDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`,
    { cache: "no-store" }
  );
  const { data }: { data: Event } = await request.json();

  if (!data) {
    return <div className="text-amber-50">Event not found</div>;
  }

  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section id="event" className="m-10">
      {/* Header Section */}
      <div className="header">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, index) => (
            <span key={index} className="pill">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="details">
        {/* Left Content - Banner, Overview, Agenda */}
        <div className="content">
          <Image
            src={data.image}
            alt={data.title}
            width={600}
            height={300}
            className="banner"
          />

          {/* Overview Section */}
          <div className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{data.overview}</p>
          </div>

          {/* Agenda Section */}
          <div className="agenda">
            <h2>Agenda</h2>
            <ul>
              {data.agenda.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Organizer Section */}
          <div className="flex-col-gap-2">
            <h2>Organizer</h2>
            <p className="mb-10">{data.organizer}</p>
          </div>
        </div>

        {/* Right Sidebar - Booking Section */}
        <div className="booking">
          <div className="signup-card">
            {/* Event Details */}
            <div className="flex flex-col gap-4">
              {/* Venue & Location */}
              <div className="flex-row-gap-2">
                <Image
                  src="/icons/pin.svg"
                  alt="Location"
                  width={20}
                  height={20}
                />
                <div className="flex flex-col">
                  <span className="text-light-100 text-sm">Venue</span>
                  <span className="text-white font-medium">
                    {data.venue}, {data.location}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="flex-row-gap-2">
                <Image
                  src="/icons/calendar.svg"
                  alt="Date"
                  width={20}
                  height={20}
                />
                <div className="flex flex-col">
                  <span className="text-light-100 text-sm">Date</span>
                  <span className="text-white font-medium">{formattedDate}</span>
                </div>
              </div>

              {/* Time */}
              <div className="flex-row-gap-2">
                <Image
                  src="/icons/clock.svg"
                  alt="Time"
                  width={20}
                  height={20}
                />
                <div className="flex flex-col">
                  <span className="text-light-100 text-sm">Time</span>
                  <span className="text-white font-medium">{data.time}</span>
                </div>
              </div>

              {/* Mode */}
              <div className="flex-row-gap-2">
                <Image
                  src="/icons/mode.svg"
                  alt="Mode"
                  width={20}
                  height={20}
                />
                <div className="flex flex-col">
                  <span className="text-light-100 text-sm">Mode</span>
                  <span className="text-white font-medium">{data.mode}</span>
                </div>
              </div>

              {/* Audience */}
              <div className="flex-row-gap-2">
                <Image
                  src="/icons/audience.svg"
                  alt="Audience"
                  width={20}
                  height={20}
                />
                <div className="flex flex-col">
                  <span className="text-light-100 text-sm">Audience</span>
                  <span className="text-white font-medium">{data.audience}</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-700" />

            {/* Sign Up Form */}
            <div id="book-event">
              <h2 className="text-white">Sign Up for Event</h2>
              <form>
                <div>
                  <label htmlFor="name" className="text-light-100 text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="placeholder-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-light-100 text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="placeholder-white"
                  />
                </div>
                <button className="bg-green-500 text-white" type="submit">Book My Spot</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;