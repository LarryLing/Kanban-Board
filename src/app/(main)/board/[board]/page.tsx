import BoardClientComponent from "@/components/blocks/board/board-client-component";
import RefreshComponent from "@/components/blocks/board/refresh-component";
import { createClient as createClientClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";

export const dynamicParams = true;

export async function generateStaticParams() {
	const supabase = createClientClient();

	const { data: boardsData, error: boardsError } = await supabase
		.from("profiles_boards_bridge")
		.select("board_id, boards(*)");

	if (boardsError) throw boardsError;

	return boardsData.map((boardData) => ({
		params: { board: String(boardData.board_id) },
	}));
}

export default async function Page({
	params,
}: {
	params: Promise<{ board: string }>;
}) {
	const { board } = await params;

	const supabase = await createServerClient();

	const { error: updateOpenedError } = await supabase
		.from("boards")
		.update({
			last_opened: new Date().toISOString().toLocaleString(),
		})
		.eq("board_id", board);

	if (updateOpenedError) throw updateOpenedError;

	const { data: boardData, error: boardError } = await supabase
		.from("boards")
		.select("*")
		.eq("board_id", board)
		.single();

	if (boardError) throw boardError;

	const { data: columnsData, error: columnsError } = await supabase
		.from("columns")
		.select("*")
		.eq("board_id", board)
		.order("position");

	if (columnsError) throw columnsError;

	const { data: cardsData, error: cardsError } = await supabase
		.from("cards")
		.select("*")
		.eq("board_id", board)
		.order("position");

	if (cardsError) throw cardsError;

	return (
		<>
			<RefreshComponent />
			<BoardClientComponent
				fetchedCards={cardsData || []}
				fetchedColumns={columnsData || []}
			/>
		</>
	);
}
