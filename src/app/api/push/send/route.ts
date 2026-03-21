import { buildPushHTTPRequest } from "@pushforge/builder";
import { NextResponse } from "next/server";
import { t } from "try";
import { context } from "@/app/lib/server/context";
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

const isValidPushSubscription = (
	subscription: StoredPushSubscription["subscription"],
): subscription is PushSubscription => {
	return Boolean(
		subscription?.endpoint &&
			subscription?.keys?.auth &&
			subscription?.keys?.p256dh,
	);
};

const { env } = context;
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
		env,
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

	if (!isValidPushSubscription(stored.subscription)) {
		return NextResponse.json(
			{
				ok: false,
				error: "Insufficient subscription structure.",
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

	const message = {
		adminContact: env.VAPID_SUBJECT,
		payload,
	};

	console.log({
		env,
		VAPID_SUBJECT: env.VAPID_SUBJECT,
		VAPID_PRIVATE_KEY: env.VAPID_PRIVATE_KEY,
	});

	const privateJWK = JSON.parse(env.VAPID_PRIVATE_KEY ?? {});
	const pushRequest = await buildPushHTTPRequest({
		privateJWK,
		subscription: stored.subscription, // TODO: fix type issue here
		message,
	});

	const response = await fetch(pushRequest.endpoint, {
		method: "POST",
		headers: pushRequest.headers,
		body: pushRequest.body,
	});

	if ([404, 410].includes(response.status)) {
		// TODO: delete dead subscription from KV
		await deletePushSubscription(env, body.clientId);
	}

	return NextResponse.json(
		{
			ok: response.ok,
		},
		{ status: response.status },
	);
};
