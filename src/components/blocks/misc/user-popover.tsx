"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LayoutGrid, LogOut, Settings2 } from "lucide-react";
import { UserProfile } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signout } from "@/lib/actions";
import Link from "next/link";
import { getSocialIcon } from "@/lib/utils";
import ProfileWidget from "./profile-widget";

export default function UserPopover({
	display_name,
	email,
	about_me,
	socials,
	avatar_url,
}: UserProfile) {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	return (
		<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
			<PopoverTrigger>
				<Avatar>
					<AvatarImage src={avatar_url} />
					<AvatarFallback>
						{display_name.substring(0, 2).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className="w-[312px] space-y-3" hideWhenDetached align="end">
				<ProfileWidget
					displayName={display_name}
					email={email}
					avatarUrl={avatar_url}
				/>
				{about_me && (
					<>
						<Separator className="w-full" />
						<p className="text-sm">{about_me}</p>
					</>
				)}
				{socials.filter((social) => social.url !== "").length > 0 && (
					<>
						<Separator className="w-full" />
						<div className="text-sm space-y-1">
							{socials
								.filter((social) => social.url !== "")
								.map((social, index) => (
									<Button
										variant="link"
										className="flex"
										key={`social_${index}`}
										onClick={() => setIsPopoverOpen(false)}
									>
										{getSocialIcon(social.url)}
										<Link
											href={social.url}
											className="underline-offset-4 hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											{new URL(social.url).pathname.substring(1)}
										</Link>
									</Button>
								))}
						</div>
					</>
				)}
				<Separator className="w-full" />
				<div className="flex flex-col justify-center items-center gap-2">
					<Button
						variant="ghost"
						className="w-full justify-start"
						asChild
						onClick={() => setIsPopoverOpen(false)}
					>
						<Link href="/dashboard">
							<LayoutGrid />
							Dashboard
						</Link>
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-start"
						asChild
						onClick={() => setIsPopoverOpen(false)}
					>
						<Link href="/settings">
							<Settings2 />
							Settings
						</Link>
					</Button>
					<Button
						variant="ghost"
						className="w-full justify-start"
						onClick={signout}
					>
						<LogOut />
						Sign Out
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
