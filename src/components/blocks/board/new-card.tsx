"use client";

import { Button } from "@/components/ui/button";
import React, { FormEvent, useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

type NewCardProps = {
	size: "default" | "icon";
	boardId: string;
	columnId: string;
	position: number;
};

export default function NewCard({
	size,
	boardId,
	columnId,
	position,
}: NewCardProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [nextPosition, setNextPosition] = useState(position);
	const [pending, setPending] = useState(false);

	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setPending(true);

		const title = titleRef.current?.value || "New Card";
		const description = descriptionRef.current?.value || "";

		const supabase = createClient();

		const { error: newCardError } = await supabase.from("cards").insert({
			board_id: boardId,
			column_id: columnId,
			position: nextPosition,
			name: title,
			description: description,
		});

		if (newCardError) throw newCardError;

		setIsDialogOpen(false);
		setNextPosition((nextPosition) => nextPosition + 1);
		setPending(false);
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				{size === "default" ? (
					<Button
						draggable="true"
						variant="outline"
						className="w-full active:cursor-grabbing h-[50px]"
						onClick={() => setIsDialogOpen(true)}
					>
						<Plus className="size-4" />
						<span className="font-semibold text-md">New Card</span>
					</Button>
				) : (
					<Button size="icon">
						<Plus />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="size-[500px] px-8">
				<form
					onSubmit={(e) => handleSubmit(e)}
					className="flex flex-col gap-4"
				>
					<DialogHeader className="hover:cursor-text">
						<DialogTitle>
							<Input
								ref={titleRef}
								id="title"
								name="title"
								className="resize-none border-none focus-visible:ring-0 p-0 md:text-lg"
								placeholder="New Card"
								defaultValue="New Card"
							/>
						</DialogTitle>
					</DialogHeader>
					<Textarea
						ref={descriptionRef}
						id="description"
						name="description"
						className="h-full resize-none border-none focus-visible:ring-0 p-0"
						placeholder="Enter some description text..."
					/>
					<DialogFooter>
						<Button
							type="button"
							variant="ghost"
							disabled={pending}
							onClick={() => setIsDialogOpen(false)}
						>
							Go Back
						</Button>
						<Button type="submit" disabled={pending}>
							{pending ? "Creating Card..." : "Create Card"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
