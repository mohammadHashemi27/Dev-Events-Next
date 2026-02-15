export type EventType = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventType[] = [
  {
    title: "Tech Conference 2026",
    image: "/images/event1.png",
    slug: "tech-conference-2026",
    location: "Tehran, Iran",
    date: "March 12, 2026",
    time: "10:00 AM",
  },
  {
    title: "Startup Networking Night",
    image: "/images/event2.png",
    slug: "startup-networking-night",
    location: "Tabriz, Iran",
    date: "April 5, 2026",
    time: "6:30 PM",
  },
  {
    title: "AI & Machine Learning Expo",
    image: "/images/event3.png",
    slug: "ai-ml-expo",
    location: "Shiraz, Iran",
    date: "May 18, 2026",
    time: "9:00 AM",
  },
  {
    title: "Frontend Developers Meetup",
    image: "/images/event4.png",
    slug: "frontend-meetup",
    location: "Isfahan, Iran",
    date: "June 10, 2026",
    time: "4:00 PM",
  },
  {
    title: "Cyber Security Workshop",
    image: "/images/event5.png",
    slug: "cyber-security-workshop",
    location: "Mashhad, Iran",
    date: "July 22, 2026",
    time: "2:00 PM",
  },
  {
    title: "Cloud Computing Summit",
    image: "/images/event6.png",
    slug: "cloud-computing-summit",
    location: "Karaj, Iran",
    date: "August 30, 2026",
    time: "11:00 AM",
  },
];
