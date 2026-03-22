"use client";
import { Toggle } from "@/app/components/toggle";
import { useClientId } from "@/app/hooks/useClientId";
import { subscribeToPush } from "@/app/lib/push/subscribeToPush";

export default () => {
	const { id: clientId } = useClientId();

	const handleOnChange = async (isChecked: boolean) => {
		if (!isChecked) {
			return;
		}
		if (!clientId) {
			return;
		}
		await subscribeToPush(clientId);
	};

	return (
		<main className="flex h-dvh flex-col items-center justify-center gap-8 text-gray-800">
			<article className="text-center flex flex-col text-gray-700">
				<Toggle
					label={"Enable Notification"}
					onChange={handleOnChange}
				/>
			</article>
		</main>
	);
};
