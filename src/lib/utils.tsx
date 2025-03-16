import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
	FacebookIcon,
	GithubIcon,
	InstagramIcon,
	LinkedInIcon,
	TwitterXIcon,
} from "@/components/icons/icon";
import { LinkIcon } from "lucide-react";
import { Tables } from "../../database.types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getLastOpened(datetime: string) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const date = new Date(datetime);
	const today = new Date();

	if (date.toDateString() === today.toDateString()) {
		const shortTime = new Intl.DateTimeFormat("en-US", {
			timeStyle: "short",
		});
		return shortTime.format(date);
	}

	return (
		months[date.getMonth()] +
		" " +
		date.getDate() +
		", " +
		date.getFullYear()
	);
}

export function processBoards(
	id: string,
	fetchedBoards: Tables<"boards">[],
	bookmarked: boolean,
	ownership: string,
	sortMethod: string,
	query: string,
) {
	let processedBoards = [...fetchedBoards];

	if (bookmarked) {
		processedBoards = processedBoards.filter((board) => board.bookmarked);
	}

	if (ownership === "Owned by me") {
		processedBoards = processedBoards.filter(
			(board) => board.profile_id === id,
		);
	} else if (ownership === "Not owned by me") {
		processedBoards = processedBoards.filter(
			(board) => board.profile_id !== id,
		);
	}

	if (sortMethod === "Last opened") {
		processedBoards.sort(
			(a, b) =>
				new Date(b.last_opened).getTime() -
				new Date(a.last_opened).getTime(),
		);
	} else if (sortMethod === "Sort ascending") {
		processedBoards.sort((a, b) => a.title.localeCompare(b.title));
	} else if (sortMethod === "Sort descending") {
		processedBoards.sort((a, b) => b.title.localeCompare(a.title));
	}

	processedBoards = processedBoards.filter((board) =>
		board.title.toLowerCase().includes(query.toLowerCase()),
	);

	return processedBoards;
}

export function getSocialIcon(socialUrl: string) {
	let url;

	try {
		url = new URL(socialUrl);
	} catch {
		return <LinkIcon className="size-4" />;
	}

	const socialIconMap = {
		"www.linkedin.com": (
			<LinkedInIcon className="size-4" fill="currentColor" />
		),
		"github.com": <GithubIcon className="size-4" fill="currentColor" />,
		"www.instagram.com": (
			<InstagramIcon className="size-4" fill="currentColor" />
		),
		"www.facebook.com": (
			<FacebookIcon className="size-4" fill="currentColor" />
		),
		"x.com": <TwitterXIcon className="size-4" fill="currentColor" />,
	};

	if (
		url.hostname !== "www.linkedin.com" &&
		url.hostname !== "github.com" &&
		url.hostname !== "www.instagram.com" &&
		url.hostname !== "www.facebook.com" &&
		url.hostname !== "x.com"
	) {
		return <LinkIcon className="size-4" />;
	}

	return <>{socialIconMap[url.hostname]}</>;
}
