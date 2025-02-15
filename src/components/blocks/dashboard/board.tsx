import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BoardType } from "@/lib/types"
import { getLastOpened } from "@/lib/utils"
import {
	Ellipsis,
	PenLine,
	Plus,
	SquareArrowOutUpRight,
	Trash2,
	Users,
} from "lucide-react"
import React from "react"

export default function Board({ id, owner, title, last_opened }: BoardType) {
	return (
		<div className="w-full h-[280px] border border-border rounded-md overflow-hidden">
			<div className="w-full h-[184px] bg-border"></div>
			<div className="w-full h-[96px] p-4 flex flex-col justify-start items-between">
				<h2 className="font-semibold text-lg">{title}</h2>
				<div className="flex justify-between items-center">
					<div className="flex justify-center items-center gap-1">
						<Users className="size-5 inline-block" />
						<span className="font-normal text-sm">
							Last Opened: {getLastOpened(last_opened)}
						</span>
					</div>
					<OptionsDropdown id={id} title={title} />
				</div>
			</div>
		</div>
	)
}

type OptionsDropdownProps = {
	id: string
	title: string
}

function OptionsDropdown({ id, title }: OptionsDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Ellipsis className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="top">
				<RenameDialog id={id} title={title} />
				<DropdownMenuItem>
					<Trash2 className="size-4" />
					<span>Delete</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<SquareArrowOutUpRight className="size-4" />
					<span>Open in new tab</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

type RenameDialogProps = {
	id: string
	title: string
}

function RenameDialog({ id, title }: RenameDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<DropdownMenuItem>
					<PenLine className="size-4" />
					<span>Rename</span>
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Rename Board</DialogTitle>
					<DialogDescription>
						Please enter a new name for this board
					</DialogDescription>
				</DialogHeader>
				<form className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Input
							id="title"
							defaultValue={title}
							className="col-span-3"
						/>
					</div>
				</form>
				<DialogFooter>
					<Button variant="outline">Cancel</Button>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export function NewBoard() {
	return (
		<Button
			variant="outline"
			className="w-full h-[280px] flex items-center justify-center gap-2"
		>
			<Plus className="size-6" />
			<span className="font-medium text-md ">New Board</span>
		</Button>
	)
}
