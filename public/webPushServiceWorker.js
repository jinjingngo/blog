self.addEventListener("push", (event) => {
	const data = event.data?.json() ?? {};
	const { title = "New notification", body = "", url = "/" } = data;

	const options = {
		body,
		data: { url },
		icon: "/icon-192.png",
		badge: "/icon-192.png",
		vibrate: [100, 50, 100],
	};

	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", ({ notification, waitUntil }) => {
	notification.close();

	const url = notification.data?.url ?? "/";

	waitUntil(
		clients
			.matchAll({ type: "window", includeUncontrolled: true })
			.then((list) => {
				for (const client of list) {
					client?.navigate(url);
					return client.close();
				}
				return clients.openWindow(url);
			}),
	);
});
