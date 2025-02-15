"use client"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Toggle } from "@/components/ui/toggle"
import {
	ArrowDownAZ,
	Bookmark,
	Check,
	LayoutGrid,
	List,
	Plus,
} from "lucide-react"
import React, { useState } from "react"

type OwnershipTypes = "Owned by anyone" | "Owned by me" | "Not owned by me"
type SortMethodTypes = "Last Opened" | "Sort Ascending" | "Sort Descending"

export default function BoardsDisplayHeader() {
	const [ownership, setOwnership] = useState("Owned by anyone")
	const [listView, setListView] = useState(false)
	const [bookmarked, setBookmarked] = useState(false)
	const [sortMethod, setSortMethod] = useState("Last Opened")

	return (
		<div className="flex flex-col gap-4">
			<h2 className="font-semibold text-3xl">My Boards</h2>
			<div className="flex justify-between">
				<Button>
					<Plus className="size-4" /> New Board
				</Button>
				<div className="sm:flex hidden gap-2">
					<OwnershipDropdown
						ownership={ownership}
						setOwnership={setOwnership}
					/>
					<ViewToggle listView={listView} setListView={setListView} />
					<BookmarkToggle
						bookmarked={bookmarked}
						setBookmarked={setBookmarked}
					/>
					<SortDropdown
						sortMethod={sortMethod}
						setSortMethod={setSortMethod}
					/>
				</div>
				<div className="block sm:hidden">
					<OptionsDropdown
						ownership={ownership}
						setOwnership={setOwnership}
						listView={listView}
						setListView={setListView}
						bookmarked={bookmarked}
						setBookmarked={setBookmarked}
						sortMethod={sortMethod}
						setSortMethod={setSortMethod}
					/>
				</div>
			</div>
		</div>
	)
}

type OwnershipDropdownProps = {
	ownership: string
	setOwnership: (arg0: string) => void
}

function OwnershipDropdown({
	ownership,
	setOwnership,
}: OwnershipDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-[160px]">
					{ownership}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					value={ownership}
					onValueChange={setOwnership}
				>
					<DropdownMenuRadioItem value="Owned by anyone">
						Owned by anyone
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="Owned by me">
						Owned by me
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="Not owned by me">
						Not owned by me
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

type ViewToggleProps = {
	listView: boolean
	setListView: (arg0: boolean) => void
}

function ViewToggle({ listView, setListView }: ViewToggleProps) {
	return (
		<Toggle
			aria-label="Toggle view"
			variant="outline"
			pressed={listView}
			onPressedChange={() => setListView(!listView)}
		>
			{listView ? (
				<List className="size-4" />
			) : (
				<LayoutGrid className="size-4" />
			)}
		</Toggle>
	)
}

type BookmarkToggleProps = {
	bookmarked: boolean
	setBookmarked: (arg0: boolean) => void
}

function BookmarkToggle({ bookmarked, setBookmarked }: BookmarkToggleProps) {
	return (
		<Toggle
			aria-label="Toggle view"
			variant="outline"
			pressed={bookmarked}
			onPressedChange={() => setBookmarked(!bookmarked)}
		>
			<Bookmark className="size-4" />
		</Toggle>
	)
}

type SortDropdownProps = {
	sortMethod: string
	setSortMethod: (arg0: string) => void
}

function SortDropdown({ sortMethod, setSortMethod }: SortDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="px-2 py-0">
					<ArrowDownAZ className="size-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup
					value={sortMethod}
					onValueChange={setSortMethod}
				>
					<DropdownMenuRadioItem value="Last Opened">
						Last Opened
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="Sort Ascending">
						Sort Ascending
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="Sort Descending">
						Sort Descending
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function OptionsDropdown({
	ownership,
	setOwnership,
	listView,
	setListView,
	bookmarked,
	setBookmarked,
	sortMethod,
	setSortMethod,
}: OwnershipDropdownProps &
	ViewToggleProps &
	BookmarkToggleProps &
	SortDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Options</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup
					value={ownership}
					onValueChange={setOwnership}
				>
					<DropdownMenuRadioItem value="Owned by anyone">
						Owned by anyone
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="Owned by me">
						Owned by me
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="Not owned by me">
						Not owned by me
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={() => setListView(false)}>
						{!listView ? (
							<Check className="size-4" />
						) : (
							<div className="size-4"></div>
						)}
						<span>Gallery View</span>
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setListView(true)}>
						{listView ? (
							<Check className="size-4" />
						) : (
							<div className="size-4"></div>
						)}
						<span>List View</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onSelect={() => setBookmarked(false)}>
						{!bookmarked ? (
							<Check className="size-4" />
						) : (
							<div className="size-4"></div>
						)}
						<span>All</span>
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setBookmarked(true)}>
						{bookmarked ? (
							<Check className="size-4" />
						) : (
							<div className="size-4"></div>
						)}
						<span>Bookmarked</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={sortMethod}
					onValueChange={setSortMethod}
				>
					<DropdownMenuRadioItem value="Last Opened">
						Last Opened
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="Sort Ascending">
						Sort Ascending
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="Sort Descending">
						Sort Descending
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
