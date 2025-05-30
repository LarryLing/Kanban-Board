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
import {
	Board,
	BookmarkedOptions,
	Collaborator,
	OwnershipOptions,
	SortOptions,
} from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getDateString(datetime: string) {
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

	return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

export function processBoards(
	id: string,
	fetchedBoards: Board[],
	bookmarked: BookmarkedOptions,
	ownership: OwnershipOptions,
	sortMethod: SortOptions,
	query: string,
) {
	let processedBoards = [...fetchedBoards];

	if (bookmarked === "true") {
		processedBoards = processedBoards.filter((board) => board.bookmarked);
	}

	if (ownership === "me") {
		processedBoards = processedBoards.filter((board) => board.owner_id === id);
	} else if (ownership === "not-me") {
		processedBoards = processedBoards.filter((board) => board.owner_id !== id);
	}

	if (sortMethod === "last-opened") {
		processedBoards.sort(
			(a, b) =>
				new Date(b.last_opened).getTime() - new Date(a.last_opened).getTime(),
		);
	} else if (sortMethod === "asc") {
		processedBoards.sort((a, b) => a.title.localeCompare(b.title));
	} else if (sortMethod === "des") {
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
		"www.linkedin.com": <LinkedInIcon className="size-4" fill="currentColor" />,
		"github.com": <GithubIcon className="size-4" fill="currentColor" />,
		"www.instagram.com": <InstagramIcon className="size-4" fill="currentColor" />,
		"www.facebook.com": <FacebookIcon className="size-4" fill="currentColor" />,
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

export function sortCollaborators(collaborators: Collaborator[], ownerId: string) {
	const sortedCollaborators = [...collaborators];

	sortedCollaborators.sort((a, b) => {
		if (a.profile_id === ownerId) {
			return -1; // 'a' comes first
		} else if (b.profile_id === ownerId) {
			return 1; // 'b' comes first
		} else {
			return 0; // Maintain original order for other elements
		}
	});

    return sortedCollaborators
}
