"use client";

import { Button } from "@/components/ui/button";
import React, { FormEvent, useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { UseCardsType } from "@/hooks/use-cards";
import { ColumnColorOptions } from "@/lib/types";

type NewCardProps = {
	size: "default" | "icon";
	columnId: string;
	columnTitle: string;
	columnColor: ColumnColorOptions;
	createCard: UseCardsType["createCard"];
};

export default function NewCard({
	size,
	columnId,
	columnTitle,
	columnColor,
	createCard,
}: NewCardProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [pending, setPending] = useState(false);

	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setPending(true);

		await createCard(
			columnId,
			titleRef.current?.value || "Untitled Card",
			descriptionRef.current?.value || "",
		);

		setIsDialogOpen(false);
		setPending(false);
	}

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				{size === "default" ? (
					<Button
						variant="ghost"
						className="w-full h-[50px]"
						onClick={() => setIsDialogOpen(true)}
					>
						<Plus className="size-4" />
						<span className="font-semibold text-md">New Card</span>
					</Button>
				) : (
					<Button size="icon" aria-label="New card">
						<Plus />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="h-[500px] px-8">
				<form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
					<DialogHeader className="hover:cursor-text">
						<DialogTitle>
							<Input
								ref={titleRef}
								id="title"
								name="title"
								className="resize-none border-none focus-visible:ring-0 p-0 md:text-lg shadow-none"
								placeholder="Untitled Card"
								defaultValue="Untitled Card"
							/>
						</DialogTitle>
						<DialogDescription className={`${columnColor} text-left`}>
							{columnTitle}
						</DialogDescription>
					</DialogHeader>
					<Textarea
						ref={descriptionRef}
						id="description"
						name="description"
						className="h-full resize-none border-none focus-visible:ring-0 p-0 shadow-none"
						placeholder="Enter some description text..."
					/>
					<DialogFooter>
						<Button
							type="button"
							variant="ghost"
							disabled={pending}
							onClick={() => setIsDialogOpen(false)}
						>
							Discard
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

export const MemoizedNewCard = React.memo(NewCard);
