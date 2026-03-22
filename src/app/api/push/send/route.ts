import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
	buildPushHTTPRequest,
	type PushSubscription as PushForgePushSubscription,
} from "@pushforge/builder";
import { NextResponse } from "next/server";
import { t } from "try";
import {
	deletePushSubscription,
	getPushSubscriptionByClientId,
	type StoredPushSubscription,
} from "@/app/lib/server/pushKV";

type PushBody = {
	clientId: string;
	title: string;
	message: string;
	url: string;
};

export const POST = async (request: Request) => {
	const [ok, error, body] = await t(request.json<PushBody>());

	if (!ok || error) {
		console.error("ERROR: parsing push payload", error);
		return NextResponse.json(
			{
				ok: false,
				error: "Invalid push payload.",
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

	const stored = (await getPushSubscriptionByClientId(
		body.clientId,
	)) as StoredPushSubscription | null;

	if (!stored) {
		return NextResponse.json(
			{
				ok: false,
				error: "Subscription not found.",
			},
			{ status: 400 },
		);
	}

	const { title, message: inMessage, url } = body;

	if (!title || !inMessage || !url) {
		return NextResponse.json(
			{
				ok: false,
				error: "Insufficient notification structure.",
			},
			{ status: 400 },
		);
	}

	const payload = {
		title,
		body: inMessage,
		url,
	};
	const { env } = await getCloudflareContext();
	const message = {
		adminContact: env.VAPID_SUBJECT,
		payload,
	};

	const privateJWK = JSON.parse(env.VAPID_PRIVATE_KEY ?? {});
	const pushRequest = await buildPushHTTPRequest({
		privateJWK,
		subscription:
			stored.subscription as unknown as PushForgePushSubscription,
		message,
	});

	const response = await fetch(pushRequest.endpoint, {
		method: "POST",
		headers: pushRequest.headers,
		body: pushRequest.body,
	});

	if ([404, 410].includes(response.status)) {
		await deletePushSubscription(body.clientId);
	}

	return NextResponse.json(
		{
			ok: response.ok,
		},
		{ status: response.status },
	);
};
