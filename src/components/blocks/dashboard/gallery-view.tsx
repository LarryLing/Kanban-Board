"use client"

import { Button } from "@/components/ui/button"
import { BoardType } from "@/lib/types"
import { getLastOpened } from "@/lib/utils"
import { Plus, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import OptionsDropdown from "./options-dropdown"

export default function GalleryView({ boards }: { boards: BoardType[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{boards.map((board) => {
				return <BoardItem {...board} key={board.id} />
			})}
			<NewBoardItem />
		</div>
	)
}

function BoardItem({ id, owner, cover, title, last_opened }: BoardType) {
	return (
		<div className="max-w-[450px] md:max-h-none w-full h-[280px] border border-border rounded-md overflow-hidden">
			<Link href={`/boards/${id}`}>
				<div className="h-[188px] bg-border relative">
					{cover ? (
						<Image
							src={cover}
							alt=""
							objectFit="cover"
							layout="fill"
						/>
					) : (
						<></>
					)}
				</div>
				<div className="h-[92px] p-4 flex flex-col justify-start items-between">
					<span className="font-semibold text-md text-left">
						{title}
					</span>
					<div className="flex justify-between items-center">
						<div className="flex justify-center items-center gap-2">
							<Users className="size-4 inline-block" />
							<span className="font-normal text-sm">
								Opened {getLastOpened(last_opened)}
							</span>
						</div>
						<OptionsDropdown id={id} title={title} />
					</div>
				</div>
			</Link>
		</div>
	)
}

function NewBoardItem() {
	return (
		<Button
			variant="outline"
			className="w-full h-[280px] flex items-center justify-center gap-2"
		>
			<Plus className="size-4" />
			<span className="font-semibold text-md">New Board</span>
		</Button>
	)
}
