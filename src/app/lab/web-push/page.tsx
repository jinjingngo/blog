"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Toggle } from "@/app/components/toggle";
import { useClientId } from "@/app/hooks/useClientId";
import {
	getPushSubscription,
	subscribeToPush,
	unsubscribeFromPush,
} from "@/app/lib/push/subscribeToPush";

type Status = "checking" | "idle" | "working" | "success" | "error";

export default function WebPushPage() {
	const { id: clientId } = useClientId();
	const [enabled, setEnabled] = useState(false);
	const [status, setStatus] = useState<Status>("checking");
	const [message, setMessage] = useState("Checking notification status…");

	useEffect(() => {
		let active = true;
		getPushSubscription()
			.then((subscription) => {
				if (!active) return;
				setEnabled(Boolean(subscription));
				setStatus("idle");
				setMessage(
					subscription
						? "Notifications are enabled on this device."
						: "Notifications are disabled on this device.",
				);
			})
			.catch(() => {
				if (!active) return;
				setStatus("error");
				setMessage(
					"This browser does not support web push notifications.",
				);
			});
		return () => {
			active = false;
		};
	}, []);

	const handleOnChange = async (nextEnabled: boolean) => {
		if (!clientId) return;
		setStatus("working");
		setMessage(
			nextEnabled
				? "Enabling notifications…"
				: "Disabling notifications…",
		);

		try {
			if (nextEnabled) await subscribeToPush(clientId);
			else await unsubscribeFromPush(clientId);
			setEnabled(nextEnabled);
			setStatus("success");
			setMessage(
				nextEnabled
					? "Notifications are enabled on this device."
					: "Notifications are disabled on this device.",
			);
		} catch (error) {
			setStatus("error");
			setMessage(
				error instanceof Error
					? error.message
					: "Something went wrong. Please try again.",
			);
		}
	};

	const sendTestNotification = async () => {
		if (!clientId) return;
		setStatus("working");
		setMessage("Sending a test notification…");
		try {
			const response = await fetch("/api/push/send", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					clientId,
					title: "Web Push Lab",
					message:
						"It works — this notification came from the Web Push API.",
					url: "/lab/web-push",
				}),
			});
			if (!response.ok)
				throw new Error("The test notification could not be sent.");
			setStatus("success");
			setMessage("Test notification sent.");
		} catch (error) {
			setStatus("error");
			setMessage(
				error instanceof Error
					? error.message
					: "Something went wrong.",
			);
		}
	};

	const busy = status === "checking" || status === "working" || !clientId;

	return (
		<div className="flex flex-1 flex-col gap-8">
			<div>
				<Link
					className="text-sm underline decoration-wavy underline-offset-4"
					href="/lab"
				>
					← /lab
				</Link>
				<h1 className="mt-5 text-4xl text-gray-900 md:text-5xl">
					Web Push
				</h1>
				<p className="mt-3 max-w-2xl text-gray-600">
					Subscribe this browser to notifications, then send a real
					push message to test the full flow.
				</p>
			</div>

			<section className="max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
				<div className="flex flex-col gap-6">
					<Toggle
						label="Enable notifications"
						checked={enabled}
						disabled={busy}
						onChange={handleOnChange}
					/>
					<p
						aria-live="polite"
						className={
							status === "error"
								? "text-sm text-red-700"
								: "text-sm text-gray-600"
						}
					>
						{message}
					</p>
					<button
						type="button"
						onClick={sendTestNotification}
						disabled={!enabled || busy}
						className="w-fit rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
					>
						Send test notification
					</button>
				</div>
			</section>
		</div>
	);
}
