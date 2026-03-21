import { t } from "try";

const getClientKey = (clientId: string) => `PUSH:CLIENT:${clientId}`;

export type StoredPushSubscription = {
	clientId: string;
	subscription: PushSubscriptionJSON;
	createdAt: string;
	updatedAt: string;
};

export const getPushSubscriptionByClientId = async (
	env: CloudflareEnv,
	clientId: string,
) => {
	const key = getClientKey(clientId);
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
	env: CloudflareEnv,
	clientId: string,
	subscription: PushSubscriptionJSON,
) => {
	const now = new Date().toISOString();
	const existing = await getPushSubscriptionByClientId(env, clientId);

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

export const deletePushSubscription = async (
	env: CloudflareEnv,
	clientId: string,
) => {
	const key = getClientKey(clientId);
	return await env.PUSH_SUBSCRIPTIONS.delete(key);
};
