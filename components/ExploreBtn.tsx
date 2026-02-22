"use client";
import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
  return (
    <div
      id="explore-btn"
      className="mt-7 mx-auto"
    >
      <a 
        href="#events"
        onClick={() => {
          console.log("CLICK");
          posthog.capture("explore_events_clicked");
        }}
      >
        Explore Events
        <Image
          src={"/icons/arrow-down.svg"}
          alt="arrow-down"
          width={24}
          height={24}
        />
      </a>
    </div>
  );
};

export default ExploreBtn;
