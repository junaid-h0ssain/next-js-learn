import Image from 'next/image';
import { IEvent } from '@/database/event.model';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

type EventPayload =
  | { success: true; data: IEvent }
  | { success: false; error: { message: string } };

const formatDate = (value: string) => {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestamp));
};

const formatTime = (value: string) => {
  if (!value) {
    return '';
  }

  const [hours, minutes] = value.split(':').map((part) => Number(part));
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value;
  }

  const date = new Date();
  date.setHours(hours, minutes);

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

const EventDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!slug) {
    return <div className="text-amber-50">Event slug is missing.</div>;
  }

  const response = await fetch(`${BASE_URL}/api/events/${slug}`, {
    cache: 'no-store',
  });

  const payload = (await response.json()) as EventPayload;

  if (!response.ok || !payload.success || !payload.data) {
    const message =
      payload?.error?.message ?? 'We could not find this event right now.';
    return <div className="text-amber-50">{message}</div>;
  }

  const event = payload.data;
  const friendlyDate = formatDate(event.date);
  const friendlyTime = formatTime(event.time);
  const agendaList =
    Array.isArray(event.agenda) && event.agenda.length > 0
      ? event.agenda
      : ['Agenda coming soon'];
  const tags = Array.isArray(event.tags) ? event.tags : [];
  const modeLabel = event.mode
    ? `${event.mode.at(0)?.toUpperCase() ?? ''}${event.mode.slice(1)}`
    : 'Event';

  return (
    <section id="event" className="py-16">
      <header className="header">
        <div className="flex flex-row flex-wrap items-center gap-3">
          <span className="pill">{modeLabel}</span>
          <span className="pill">{event.audience}</span>
          <span className="pill">{event.venue}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-semibold leading-tight">{event.title}</h1>
          <p className="text-light-100 text-lg max-w-2xl">{event.overview}</p>
        </div>
        <div className="flex flex-row flex-wrap gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-sm uppercase tracking-[0.3em] text-light-200">
              Start
            </span>
            <div className="flex flex-row items-center gap-3">
              <Image
                src="/icons/calendar.svg"
                alt="Calendar icon"
                width={20}
                height={20}
              />
              <p className="text-light-100 text-lg">{friendlyDate}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm uppercase tracking-[0.3em] text-light-200">
              Time
            </span>
            <div className="flex flex-row items-center gap-3">
              <Image src="/icons/clock.svg" alt="Clock icon" width={20} height={20} />
              <p className="text-light-100 text-lg">{friendlyTime}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm uppercase tracking-[0.3em] text-light-200">
              Location
            </span>
            <div className="flex flex-row items-center gap-3">
              <Image src="/icons/pin.svg" alt="Pin icon" width={20} height={20} />
              <p className="text-light-100 text-lg">{event.location}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="details">
        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            width={1200}
            height={675}
            className="banner"
            priority
          />

          <div className="flex flex-col gap-6">
            <div className="flex flex-row flex-wrap gap-10">
              <div className="flex flex-row-gap-2 items-center">
                <Image
                  src="/icons/audience.svg"
                  alt="Audience icon"
                  width={20}
                  height={20}
                />
                <div>
                  <p className="text-light-200 text-xs uppercase tracking-[0.3em]">Audience</p>
                  <p className="text-light-100 text-lg">{event.audience}</p>
                </div>
              </div>
              <div className="flex flex-row-gap-2 items-center">
                <Image
                  src="/icons/mode.svg"
                  alt="Mode icon"
                  width={20}
                  height={20}
                />
                <div>
                  <p className="text-light-200 text-xs uppercase tracking-[0.3em]">Mode</p>
                  <p className="text-light-100 text-lg">{modeLabel}</p>
                </div>
              </div>
              <div className="flex flex-row-gap-2 items-center">
                <Image
                  src="/icons/pin.svg"
                  alt="Venue icon"
                  width={20}
                  height={20}
                />
                <div>
                  <p className="text-light-200 text-xs uppercase tracking-[0.3em]">Venue</p>
                  <p className="text-light-100 text-lg">{event.venue}</p>
                </div>
              </div>
            </div>

            <p className="text-light-100 text-lg max-w-3xl">{event.description}</p>

            <div className="flex flex-row flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="pill text-xs">
                  {tag}
                </span>
              ))}
            </div>

            <div className="agenda">
              <h3 className="text-2xl font-bold">Agenda</h3>
              <ul>
                {agendaList.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="booking">
          <div className="signup-card">
            <div className="flex flex-col gap-2">
              <p className="text-light-200 text-xs uppercase tracking-[0.3em]">Organizer</p>
              <p className="text-light-100 text-lg">{event.organizer}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-light-200 text-xs uppercase tracking-[0.3em]">When</p>
              <p className="text-light-100 text-lg">
                {friendlyDate} • {friendlyTime}
              </p>
            </div>

            <form id="book-event">
              <div>
                <label className="text-light-200 text-xs uppercase tracking-[0.3em]" htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-light-200 text-xs uppercase tracking-[0.3em]" htmlFor="email">
                  Email
                </label>
                <input id="email" name="email" type="email" placeholder="you@example.com" />
              </div>
              <div>
                <label
                  className="text-light-200 text-xs uppercase tracking-[0.3em]"
                  htmlFor="tickets"
                >
                  Tickets
                </label>
                <input id="tickets" name="tickets" type="number" min="1" defaultValue={1} />
              </div>
              <button type="button">Book this event</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;