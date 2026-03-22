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

self.addEventListener("notificationclick", (event) => {
	event.notification.close();

	const url = event.notification.data?.url ?? "/";

	event.waitUntil(
		clients
			.matchAll({ type: "window", includeUncontrolled: true })
			.then((list) => {
				for (const client of list) {
					return client.navigate(url).then(() => client.focus());
				}
				return clients.openWindow(url);
			}),
	);
});
