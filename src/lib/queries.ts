import { Board, UserPermissions, Card, Collaborator, Column, TypedSupabaseClient, UserProfile } from "./types";

export async function selectCardsByBoardId(supabase: TypedSupabaseClient, boardId: string) {
    const {data: cardsData, error: cardsError } = await supabase
        .from("cards")
		.select("cards")
		.eq("board_id", boardId)
		.single();

    if (cardsError) {
        return {
            data: null,
            error: cardsError
        }
    }

    return {
        data: cardsData.cards as Card[],
        error: null
    }
}

export async function updateCardsByBoardId(supabase: TypedSupabaseClient, boardId: string, updatedCards: Card[]) {
    const { error: updatedCardsError } = await supabase
        .from("cards")
        .update({
            cards: updatedCards,
        })
        .eq("board_id", boardId);

    if (updatedCardsError) throw updatedCardsError;
}

export async function selectColumnsByBoardId(supabase: TypedSupabaseClient, boardId: string) {
    const {data: columnsData, error: columnsError } = await supabase
        .from("columns")
		.select("columns")
		.eq("board_id", boardId)
		.single();

    if (columnsError) {
        return {
            data: null,
            error: columnsError
        }
    }

    return {
        data: columnsData.columns as Column[],
        error: null
    }
}

export async function updateColumnsByBoardId(supabase: TypedSupabaseClient, boardId: string, updatedColumns: Column[]) {
    const { error: updateColumnsError } = await supabase
        .from("columns")
        .update({
            columns: updatedColumns,
        })
        .eq("board_id", boardId);

    if (updateColumnsError) throw updateColumnsError;
}

export async function selectBoardByBoardAndProfileId(supabase: TypedSupabaseClient, boardId: string, profileId: string) {
    const selectBoardsPromise = supabase
        .from("profiles_boards_bridge")
        .select("bookmarked, has_invite_permissions, boards(*)")
        .match({board_id: boardId, profile_id: profileId})
        .single()

    const selectCollaboratorCountPromise = supabase
        .from("profiles_boards_bridge")
        .select('*', { count: 'exact', head: true })
        .match({board_id: boardId, profile_id: profileId})

    const [selectBoardsResponse, selectCollaboratorCountResponse] = await Promise.all([selectBoardsPromise, selectCollaboratorCountPromise]);

    if (selectBoardsResponse.error) {
        return {
            data: null,
            error: selectBoardsResponse.error
        }
    }

    if (selectCollaboratorCountResponse.error) {
        return {
            data: null,
            error: selectCollaboratorCountResponse.error
        }
    }

    const board: Board = {
        ...selectBoardsResponse.data.boards,
        bookmarked: selectBoardsResponse.data.bookmarked,
    }

    return {
        data: board,
        error: null,
    }
}

export async function selectBoardsByProfileId(supabase: TypedSupabaseClient, profileId: string) {
    const { data: boardsData, error: boardsError } = await supabase
        .from("profiles_boards_bridge")
        .select("bookmarked, has_invite_permissions, boards(*)")
        .eq("profile_id", profileId);

    if (boardsError) {
        return {
            data: null,
            error: boardsError,
        }
    }

    const boards: Board[] = boardsData.map((item) => {
        return {
            ...item.boards,
            bookmarked: item.bookmarked,
        };
    });

    return {
        data: boards,
        error: null,
    }
}

export async function updateBoardLastOpenedColumn(supabase: TypedSupabaseClient, boardId: string) {
    const { error: updateBoardsError } = await supabase
		.from("boards")
		.update({
			last_opened: new Date().toISOString().toLocaleString(),
		})
		.eq("id", boardId);

    return {
        error: updateBoardsError
    }
}

export async function selectCollaboratorsByBoardId(supabase: TypedSupabaseClient, boardId: string) {
    const {data: collaboratorData, error: collaboratorError } = await supabase
        .from("profiles_boards_bridge")
        .select("profile_id, has_invite_permissions, profiles(id, display_name, email, avatar_path)")
        .eq("board_id", boardId);

    if (collaboratorError) {
        return {
            data: null,
            error: collaboratorError
        }
    }

    const fetchedCollaborators = collaboratorData.map(
        (collaborator) => {
            return {
                profile_id: collaborator.profiles.id,
                display_name: collaborator.profiles.display_name,
                email: collaborator.profiles.email,
                avatar_url: supabase.storage.from("avatars").getPublicUrl(collaborator.profiles.avatar_path).data.publicUrl,
                has_invite_permissions: collaborator.has_invite_permissions
            }
        },
    ) as Collaborator[];

    return {
        data: fetchedCollaborators,
        error: null
    }
}

export async function selectProfileByProfileId(supabase: TypedSupabaseClient, profileId: string) {
    const { data: fetchData, error: fetchError } = await supabase
		.from("profiles")
		.select("*, socials(url)")
		.eq("id", profileId)
		.single();

	if (fetchError) {
        return {
            data: null,
            error: fetchError,
        }
    }

	const { data: publicUrl } = supabase.storage
		.from("avatars")
		.getPublicUrl(fetchData.avatar_path);

    return {
        data: {
            id: fetchData.id,
            display_name: fetchData.display_name,
            email: fetchData.email,
            about_me: fetchData.about_me,
            avatar_url: publicUrl.publicUrl,
            socials: fetchData.socials,
        } as UserProfile,
        error: null,
    }
}

export async function selectPermissionsByProfileIdAndBoardId(supabase: TypedSupabaseClient, boardId: string, profileId: string) {
	const { data: boardMember, error: boardMemberError } = await supabase
        .from("profiles_boards_bridge")
        .select("has_invite_permissions, boards(owner_id)")
        .match({board_id: boardId, profile_id: profileId})
        .single();

    if (boardMemberError) {
        return {
            data: null,
            error: boardMemberError
        }
    }

    return {
        data: {
            is_owner: boardMember.boards.owner_id === profileId,
            has_invite_permissions: boardMember.has_invite_permissions,
        } as UserPermissions,
        error: null,
    }
}
