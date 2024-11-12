import React from "react";
import { InfiniteMovingCards } from "./aui/infinite-moving-cards";

export default function Testimonials() {
  return (
    // bg-white dark:bg-black dark:bg-grid-white/[0.05]
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md pb-20 antialiased">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    name: "Elon Musk",
    title: "Founder & CEO of SpaceX",
    image: "https://github.com/shadcn.png",
    quote: "I would like to die on Mars. Just not on impact.",
  },
  {
    name: "Ada Lovelace",
    title: "Mathematician & Writer",
    image: "https://github.com/shadcn.png",
    quote:
      "The Analytical Engine has no pretensions to originate anything. It can do whatever we know how to order it to perform.",
  },
  {
    name: "Steve Jobs",
    title: "Co-founder of Apple Inc.",
    image: "https://github.com/shadcn.png",
    quote:
      '"Design is not just what it looks like and feels like. Design is how it works."',
  },
  {
    name: "Grace Hopper",
    title: "Computer Scientist",
    image: "https://github.com/shadcn.png",
    quote:
      "\"Humans are allergic to change. They love to say, 'We've always done it this way.' I try to fight that. That's why I have a clock on my wall that runs counter-clockwise.\"",
  },
  {
    name: "Alan Turing",
    title: "Mathematician & Computer Scientist",
    image: "https://github.com/shadcn.png",
    quote:
      '"We can only see a short distance ahead, but we can see plenty there that needs to be done."',
  },
  {
    name: "Marissa Mayer",
    title: "Former CEO of Yahoo",
    image: "https://github.com/shadcn.png",
    quote:
      '"I always did something I was a little not ready to do. I think that’s how you grow. When there’s that moment of, ‘Wow, I’m not really sure I can do this,’ and you push through those moments, that’s when you have a breakthrough."',
  },
  {
    name: "Bill Gates",
    title: "Co-founder of Microsoft",
    image: "https://github.com/shadcn.png",
    quote:
      '"Your most unhappy customers are your greatest source of learning."',
  },
  {
    name: "Sheryl Sandberg",
    title: "COO of Facebook",
    image: "https://github.com/shadcn.png",
    quote:
      '"The challenge of leadership is to be strong, but not rude; be kind, but not weak; be bold, but not bully; be thoughtful, but not lazy; be humble, but not timid; be proud, but not arrogant; have humor, but without folly."',
  },
  {
    name: "Mark Zuckerberg",
    title: "CEO of Meta Platforms Inc.",
    image: "https://github.com/shadcn.png",
    quote:
      '"The biggest risk is not taking any risk. In a world that’s changing really quickly, the only strategy that is guaranteed to fail is not taking risks."',
  },
  {
    name: "Susan Wojcicki",
    title: "CEO of YouTube",
    image: "https://github.com/shadcn.png",
    quote:
      '"Don’t let anyone tell you that you can’t do something, because they are just telling you about their own limitations, not yours."',
  },
];
