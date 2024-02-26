"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "AI/ML to the Forefront",
    description:
      "Valence leverages AI/ML models in almost every aspect of the user experience to facilitate faster and more reliable triage of unstructured data. Valence's goal is to allow the experts to focus on the most important tasks and integrate AI/ML seamlessly into existing workflows. Valence strives to leverage our experts knowledge continuously to improve the AI/ML models and provide the best possible results.",
  },
  {
    title: "Community Driven Development",
    description:
      "Valence is an open project, allowing for community contributions and a more transparent development process. We believe that public repositories and non-monolithic applications are key to continual improvement and innovation. We are in a period where Open Source rules technological innovation and provides a baseline in the absence of thorough evaluation processes.",
  },
  {
    title: "Fail Fast, Fail Often",
    description:
      "The Valence team adopts a innovative approach to development, allowing for rapid prototyping and iteration. This allows us to quickly identify the best solutions and move forward with confidence. We believe aim to fill a needed gap in a production system that may not offer the best solution but can pivot fast. This allows us to quickly identify the best solutions and move forward with confidence.",
  },
];

export default function typeLayout({
    children
}) {
    return (
            <WavyBackground className="h-screen max-w-4xl pb-40 mx-auto">
                <p className="my-10 text-2xl font-bold text-center text-white md:text-4xl lg:text-7xl inter-var">
                    Valence
                </p>
                <p className="text-base font-bold text-center text-white text-bold md:text-lg inter-var">
                    Valence is an application designed to put AI/ML at the forefront of unstructured data triage.
                </p>
                <div className="">
                    <StickyScroll content={content} />
                </div>
                {children}
            </WavyBackground>
    );
}

