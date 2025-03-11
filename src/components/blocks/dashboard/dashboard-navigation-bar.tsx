import React from "react";
import { UserProfile } from "@/lib/types";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import AvatarPopover from "./avatar-popover";
import Branding from "../misc/branding";

type DashboardNavigationBarProps = {
	userProfile: UserProfile;
};

export default function DashboardNavigationBar({
	userProfile,
}: DashboardNavigationBarProps) {
	return (
		<NavigationMenu className="sticky text-nowrap max-w-none w-full basis-[80px] px-4 flex justify-between items-center border-b-[1px] border-border">
			<Branding />
			<AvatarPopover userProfile={userProfile} />
		</NavigationMenu>
	);
}
