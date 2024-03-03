"use client";
import React from "react";
import { WavyBackground } from "@/components/about/wavy-background";
import { StickyScroll } from "@/components/about/sticky-scroll-reveal";
import { techStackApps } from "@/components/about/const/techStackApps";
import { autoScalingApps } from "@/components/about/const/autoScalingApps";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const apps = [];



const content = [
	{
		title: "Uniform AI/ML Integration",
		description:
			`Valence aims to leverage AI/ML models in almost every aspect of the user experience to facilitate faster
			and more reliable triage of unstructured data. Valence's goal is to allow the experts to focus on 
			the most important tasks and integrate AI/ML seamlessly into existing workflows. Valence strives for a
			paradigm where users are pushed data rather than relying on complex methodologies. Furthermore, we aim to 
			leverage our experts knowledge continuously to improve the AI/ML models and provide the best possible 
			results.`,
		apps: techStackApps,
	},
	{
		title: "Community Driven Development",
		description:
			`Valence is an open project, allowing for community contributions and a more transparent development 
			process. We believe that public repositories and non-monolithic applications are key to continual 
			improvement and innovation. We are in a period where Open Source rules technological innovation and 
			provides a baseline in the absence of thorough evaluation processes.`,
		apps: apps
	},
	{
		title: "Enterprise Autoscaling",
		description:
			`The Valence team's goal is to fill a needed gap in a production system for data scientists and data
			engineers to deploy their models and other analytics against unstructured data. By leveraging the cloud
			and event-based architecture, Valence provides a platform that can scale from zero to millions of 
			asynchronous events, balancing costs with the urgency required for our most urgent datasets.`,
		apps: autoScalingApps,
	},
];

export default function AboutPage({ children }) {
	const { theme } = useTheme();

	return (
		<div className="h-screen max-w-4xl">
			<p className="mt-10 text-2xl font-bold text-center dark:text-white md:text-4xl lg:text-7xl inter-var">
				Valence
			</p>
			<p className="text-base font-bold text-center text-white text-bold md:text-lg inter-var">
				Unstructured Data Triage with AI/ML
			</p>
			<WavyBackground 
				containerClassName="mt-3" 
				backgroundFill="black" 
				canvasHeight={250}
			/>
			<StickyScroll content={content} />
			{children}
		</div>
	);
}

