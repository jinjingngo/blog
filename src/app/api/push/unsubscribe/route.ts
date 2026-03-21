import { NextResponse } from "next/server";
import { t } from "try";
import { context } from "@/app/lib/server/context";
import { deletePushSubscription } from "@/app/lib/server/pushKV";
import type { SubscribeBody } from "../subscribe/route";

type UnsubscribeBody = Pick<SubscribeBody, "clientId">;

const { env } = context;

export const POST = async (request: Request) => {
	const [ok, error, body] = await t(request.json<UnsubscribeBody>());

	if (!ok || error) {
		console.error("ERROR: parsing unsubscribe payload", error);
		return NextResponse.json(
			{
				ok: false,
				error: "Invalid unsubscribe payload.",
			},
			{ status: 400 },
		);
	}
	if (!body?.clientId) {
		return NextResponse.json(
			{
				ok: false,
				error: "Missing clientId.",
			},
			{ status: 400 },
		);
	}

	await deletePushSubscription(env, body.clientId);

	return NextResponse.json({ ok: true });
};
