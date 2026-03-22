import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export const GET = async () => {
	const { env } = await getCloudflareContext();
	return NextResponse.json({
		publicKey: env.VAPID_PUBLIC_KEY,
	});
};
