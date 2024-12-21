import React from "react";
import { InfiniteMovingCards } from "./aui/infinite-moving-cards";
import { testimonials } from "@/config/testimonials";

export default function Testimonials() {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md pb-20 antialiased">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
