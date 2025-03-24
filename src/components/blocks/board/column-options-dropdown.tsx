"use client";

import React from "react";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, PenLine, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
	Card,
	CardsJson,
	Column,
	ColumnsJson,
} from "../../../../database.types";
import { createClient } from "@/lib/supabase/client";

type ColumnOptionsDropdownProps = {
	boardId: string;
	columnId: string;
	columns: Column[];
	cards: Card[];
};

export default function ColumnOptionsDropdown({
	boardId,
	columnId,
	columns,
	cards,
}: ColumnOptionsDropdownProps) {
	const { theme } = useTheme();

	async function deleteCard() {
		const supabase = createClient();

		const updatedCardsJson = {
			cards: cards.filter((cards) => cards.column_id !== columnId),
		} as CardsJson;

		const { error: updateCardsError } = await supabase
			.from("cards_json")
			.update({
				cards: updatedCardsJson,
			})
			.eq("board_id", boardId);

		if (updateCardsError) throw updateCardsError;

		const updatedColumnsJson = {
			columns: columns.filter((column) => column.id !== columnId),
		} as ColumnsJson;

		const { error: updateColumnsError } = await supabase
			.from("columns_json")
			.update({
				columns: updatedColumnsJson,
			})
			.eq("board_id", boardId);

		if (updateColumnsError) throw updateColumnsError;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<PenLine className="size-4" />
					<span>Rename</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => deleteCard()}>
					<Trash2 className="size-4" />
					<span>Delete</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<div
						className={`${theme === "dark" ? "bg-white" : "bg-black"} rounded-sm size-4`}
					/>
					<span>Default</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<div className="bg-amber-900 rounded-sm size-4" />
					<span>Brown</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<div className="bg-orange-400 rounded-sm size-4" />
					<span>Orange</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<div className="bg-yellow-400 rounded-sm size-4" />
					<span>Yellow</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<div className="bg-green-800 rounded-sm size-4" />
					<span>Green</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<div className="bg-blue-500 rounded-sm size-4" />
					<span>Blue</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<div className="bg-purple-800 rounded-sm size-4" />
					<span>Purple</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<div className="bg-pink-400 rounded-sm size-4" />
					<span>Pink</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<div className="bg-red-600 rounded-sm size-4" />
					<span>Red</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
