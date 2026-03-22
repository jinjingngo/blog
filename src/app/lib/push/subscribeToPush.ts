const urlBase64ToUint8Array = (base64String: string) => {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, "+")
		.replace(/_/g, "/");
	const rawData = atob(base64);

	return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

export const subscribeToPush = async (clientId: string) => {
	if (typeof window === "undefined") {
		throw new Error("Push subscription is only available in the browser.");
	}
	if (!("serviceWorker" in navigator)) {
		throw new Error("Service workers are not supported.");
	}

	if (!("Notification" in window)) {
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

// TODO: risky approach for updating service worker, find an alternative way
(async () => {
	if (typeof window === "undefined") {
		return;
	}
	const registration = await navigator.serviceWorker.getRegistration();

	if (!registration) {
		return;
	}

	registration.addEventListener("updatefound", async (event) => {
		console.log({ registration, event });
		await registration.update();
	});
})();
