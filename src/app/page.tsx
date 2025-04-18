import Footer from "@/components/blocks/misc/footer";
import HomeNavigationBar from "@/components/blocks/misc/home-navigation-bar";
import { createClient } from "@/lib/supabase/server";

import React from "react";

export default async function HomePage() {
	const supabase = await createClient();
	const { data: userData } = await supabase.auth.getUser();

	return (
		<div>
			<HomeNavigationBar user={userData.user} />
			<Footer />
		</div>
	);
}
