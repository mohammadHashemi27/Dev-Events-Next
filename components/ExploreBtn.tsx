"use client";
import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
  return (
    <div id="explore-btn" className="mt-7 max-w-4xl mx-auto justify-center animate-bounce">
      <a
        href="#events"
        className="flex items-center gap-2 text-sm font-medium"
        onClick={() => {
          posthog.capture("explore_events_clicked");
        }}
      >
        <span>Explore Events</span>
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow down"
          width={20}
          height={20}
        />
      </a>
    </div>
  );
};

export default ExploreBtn;
