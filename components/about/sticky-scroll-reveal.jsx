"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import Apps from "@/components/about/apps";


export const StickyScroll = ({
  content,
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 0.2 && latest <= breakpoint) {
        setActiveCard(() => index);
      }
    });
  });
  const backgroundColors = [
    "var(--transparent)",
    "var(--transparent)",
    "var(--transparent)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #38bdf8, #e879f9)",
    "linear-gradient(to bottom right, #e879f9, var(--blue-500))",
    "linear-gradient(to bottom right, var(--blue-500), #c084fc)",
  ];
  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 my-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4 div">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="max-w-sm mt-10 font-bold text-kg text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        className="sticky hidden h-auto overflow-hidden bg-white rounded-md lg:block w-100 top-10"
      >
        <div className="flex">
          <Apps collabApps={content[activeCard].apps} />
        </div>       
      </motion.div>
    </motion.div>
  );
};
