import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
	Bookmark,
	Ellipsis,
	PenLine,
	SquareArrowOutUpRight,
	Trash2,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { bookmarkBoard } from "@/lib/actions";

type OptionsDropdownProps = {
	side: "top" | "right" | "bottom" | "left" | undefined;
	boardId: string;
	bookmarked: boolean;
	setIsRenameDialogOpen: (arg0: boolean) => void;
	setIsDeleteDialogOpen: (arg0: boolean) => void;
};

export default function BoardOptionsDropdown({
	side,
	boardId,
	bookmarked,
	setIsRenameDialogOpen,
	setIsDeleteDialogOpen,
}: OptionsDropdownProps) {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Ellipsis className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side={side}>
				<DropdownMenuItem onClick={() => setIsRenameDialogOpen(true)}>
					<PenLine className="size-4" />
					<span>Rename</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => bookmarkBoard(boardId, bookmarked)}
				>
					<Bookmark className="size-4" />
					<span>Bookmark</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
					<Trash2 className="size-4" />
					<span>Delete</span>
				</DropdownMenuItem>
				<Link
					href={`/board/${boardId}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<DropdownMenuItem>
						<SquareArrowOutUpRight className="size-4" />
						<span>Open in new tab</span>
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
