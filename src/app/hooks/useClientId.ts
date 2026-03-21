import { useCallback, useEffect, useState } from "react";
import { t } from "try";
import { useIsMounted } from "usehooks-ts";

const CLIENT_ID_STORAGE_KEY = "JJ:WEB_PUSH_CLIENT_ID";

const generateClientId = () => {
	if (
		typeof crypto !== "undefined" &&
		typeof crypto.randomUUID === "function"
	) {
		return crypto.randomUUID();
	}
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const useClientId = () => {
	const [id, setId] = useState<string | null>(null);
	const isMounted = useIsMounted();

	const loadClientId = useCallback(() => {
		const [readOk, readError, stored] = t(() =>
			localStorage.getItem(CLIENT_ID_STORAGE_KEY),
		);

		if (!readOk || readError) {
			console.error("Unable to read client id", readError);
			return;
		}

		if (stored) {
			setId(stored);
			return stored;
		}

		const newId = generateClientId();
		const [writeOk, writeError] = t(() =>
			localStorage.setItem(CLIENT_ID_STORAGE_KEY, newId),
		);

		if (!writeOk || writeError) {
			console.error("Unable to write client id", writeError);
			return;
		}

		setId(newId);
		return newId;
	}, []);

	useEffect(() => {
		if (!isMounted) return;
		loadClientId();
	}, [loadClientId, isMounted]);

	return { id };
};
