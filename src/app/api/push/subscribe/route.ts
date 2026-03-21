import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { t } from "try";
import { putPushSubscription } from "@/app/lib/server/pushKV";

export type SubscribeBody = {
	clientId: string;
	subscription: PushSubscriptionJSON;
};

export const POST = async (request: Request) => {
	const [ok, error, body] = await t(request.json<SubscribeBody>());

	if (!ok || error) {
		console.error("ERROR: parsing subscription payload", error);
		return NextResponse.json(
			{
				ok: false,
				error: "Invalid subscription payload.",
			},
			{ status: 400 },
		);
	}

	if (!body?.clientId || !body.subscription?.endpoint) {
		return NextResponse.json(
			{
				ok: false,
				error: "Invalid subscription payload.",
			},
			{ status: 400 },
		);
	}

	const { env } = await getCloudflareContext();
	const saved = await putPushSubscription(
		env,
		body.clientId,
		body.subscription,
	);

	return NextResponse.json({
		ok: true,
		clientId: saved.clientId,
		updatedAt: saved.updatedAt,
	});
};
