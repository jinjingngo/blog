import { getCloudflareContext } from "@opennextjs/cloudflare";
import { t } from "try";

const getClientKey = (clientId: string) => `PUSH:CLIENT:${clientId}`;

export type StoredPushSubscription = {
	clientId: string;
	subscription: PushSubscriptionJSON;
	createdAt: string;
	updatedAt: string;
};

export const getPushSubscriptionByClientId = async (clientId: string) => {
	const key = getClientKey(clientId);
	const { env } = await getCloudflareContext();
	const raw = await env.PUSH_SUBSCRIPTIONS.get(key);
	if (!raw) {
		return null;
	}
	const [ok, error, subscription] = t<StoredPushSubscription>(
		JSON.parse(raw),
	);

	if (!ok || error) {
		console.error("[ERROR] Parsing StoredPushSubscription error ", error);
	}

	return subscription;
};

export const putPushSubscription = async (
	clientId: string,
	subscription: PushSubscriptionJSON,
) => {
	const { env } = await getCloudflareContext();
	const now = new Date().toUTCString();
	const existing = await getPushSubscriptionByClientId(clientId);

	const value: StoredPushSubscription = {
		clientId,
		subscription,
		createdAt: existing?.createdAt ?? now,
		updatedAt: now,
	};

	const key = getClientKey(clientId);

	await env.PUSH_SUBSCRIPTIONS.put(key, JSON.stringify(value));

	return value;
};

export const deletePushSubscription = async (clientId: string) => {
	const { env } = await getCloudflareContext();
	const key = getClientKey(clientId);
	return await env.PUSH_SUBSCRIPTIONS.delete(key);
};
