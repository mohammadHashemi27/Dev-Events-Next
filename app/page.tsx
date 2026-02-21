import EventCards from "@/components/EventCards";
import ExploreBtn from "@/components/ExploreBtn";
import { events, EventType } from "@/lib/constants";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function page() {
  const res = await fetch(`${BASE_URL}/api/events`);
  const { events } = await res.json();
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event you Cant Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons,Meetups and Conferences,All in One Place
      </p>
      <ExploreBtn />
      <div className="  mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events list-none">
          {events &&
            events.length > 0 &&
            events.map((event: EventType) => (
              <li key={event.title}>
                <EventCards {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
