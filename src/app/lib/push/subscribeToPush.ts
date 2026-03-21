const urlBase64ToUint8Array = (base64String: string) => {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, "+")
		.replace(/_/g, "/");
	const rawData = atob(base64);

	return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

export const subscribeToPush = async (clientId: string) => {
	if (!("serviceWorker" in navigator)) {
		throw new Error("Service workers are not supported.");
	}

	if (!("PushManager" in window)) {
		throw new Error("Push notifications are not supported.");
	}

	const permission = await Notification.requestPermission();

	if (permission !== "granted") {
		throw new Error("Notification permission was not granted.");
	}

	const registration = await navigator.serviceWorker.register(
		"/webPushServiceWorker.js",
	);

	const publicKeyResponse = await fetch("/api/push/public_key");
	const { publicKey } = await publicKeyResponse.json<{ publicKey: string }>();

	const subscription = await registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicKey),
	});

	const response = await fetch("/api/push/subscribe", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			clientId,
			subscription: subscription.toJSON(),
		}),
	});

	if (!response.ok) {
		throw new Error("Failed to save push subscription.");
	}

	return subscription;
};
