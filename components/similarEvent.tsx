"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

import { useRef } from "react";
import EventCard from "./EventCard";
import { IEvent } from "@/database";
import type { Swiper as SwiperType } from "swiper";

const SimilarEventsSlider = ({
  similarEvents,
}: {
  similarEvents: IEvent[];
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full pt-20 relative">
      <h2 className="text-2xl font-bold mb-8">Similar Events</h2>

      {/* دکمه چپ */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-black text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        {"<"}
      </button>

      {/* دکمه راست */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-black text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        {">"}
      </button>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={24}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {similarEvents.map((event) => (
          <SwiperSlide key={String(event._id)}>
            <div className="transition duration-300 hover:-translate-y-2">
              <EventCard {...event} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarEventsSlider;
