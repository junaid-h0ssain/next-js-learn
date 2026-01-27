

const EventDetails = async ({ params }: { params: { slug: string } }) => {
  const  { slug } = await params;
  const request = await fetch(`http://localhost:3000/api/events/${slug}`, {cache: 'no-store'});
  const {data} = await request.json();

  if (!data) {
    return <div className="text-amber-50">Event not found</div>;
  }

  return (
    <h1>You are in {slug} event page</h1>
  )
}

export default EventDetails