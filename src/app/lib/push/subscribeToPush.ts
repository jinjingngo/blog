const urlBase64ToUint8Array = (base64String: string) => {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, "+")
		.replace(/_/g, "/");
	const rawData = atob(base64);

	return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

const savePushSubscription = async (
	clientId: string,
	subscription: PushSubscription,
) => {
	const response = await fetch("/api/push/subscribe", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			clientId,
			subscription: subscription.toJSON(),
		}),
	});

	if (!response.ok) throw new Error("Failed to save push subscription.");
};

// TODO: iOS Notification and ServiceWorker check need to be investigated further
export const subscribeToPush = async (clientId: string) => {
	if (typeof window === "undefined") {
		throw new Error("Push subscription is only available in the browser.");
	}

	if (!("Notification" in window)) {
		throw new Error("Push notifications are not supported.");
	}
	if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
		throw new Error(
			"Push notifications are not supported in this browser.",
		);
	}

	const permission = await Notification.requestPermission();

	if (permission !== "granted") {
		throw new Error("Notification permission was not granted.");
	}

	const registration = await navigator.serviceWorker.register(
		"/webPushServiceWorker.js",
	);

	const existingSubscription =
		await registration.pushManager.getSubscription();
	if (existingSubscription) {
		await savePushSubscription(clientId, existingSubscription);
		return existingSubscription;
	}

	const publicKeyResponse = await fetch("/api/push/public_key");
	if (!publicKeyResponse.ok) {
		throw new Error("Unable to load the push notification key.");
	}
	const { publicKey } = await publicKeyResponse.json<{ publicKey: string }>();
	if (!publicKey)
		throw new Error("The push notification key is unavailable.");

	const subscription = await registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicKey),
	});

	await savePushSubscription(clientId, subscription);

	return subscription;
};

export const getPushSubscription = async () => {
	if (!("serviceWorker" in navigator)) return null;
	const registration = await navigator.serviceWorker.getRegistration();
	return registration?.pushManager.getSubscription() ?? null;
};

export const unsubscribeFromPush = async (clientId: string) => {
	const subscription = await getPushSubscription();
	const response = await fetch("/api/push/unsubscribe", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ clientId }),
	});
	if (!response.ok) throw new Error("Failed to remove push subscription.");
	if (subscription) await subscription.unsubscribe();
};
