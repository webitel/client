const TIMEOUT = 120_000;
const INTERVAL = 300;
const STORAGE_KEY = 'ssoInspectToken';

export const useInspectSingleSignOnToken = () => {
	const getUrl = (id: number) => `/api/login/${id}/inspect`;

	const parseTokenData = (tab) => {
		const bodyText = tab.document.body?.textContent?.trim();
		if (!bodyText) return null;

		return JSON.parse(bodyText);
	};

	const getToken = () => {
		const token = localStorage.getItem(STORAGE_KEY);
		return token ? JSON.parse(token) : {};
	};

	const getTokenDataFromStorage = (id: number) => getToken()[id] ?? null;

	const setTokenDataToStorage = (id: number, data) => {
		const allTokens = getToken();
		allTokens[id] = data;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(allTokens));
	};

	const watchSsoTab = (
		id: number,
		tab: Window,
		onResult: (data: any) => void,
	) => {
		const startTime = Date.now();
		let intervalId: ReturnType<typeof setInterval>;
		let finished = false;

		const finish = (data) => {
			if (finished) return;
			finished = true;

			clearInterval(intervalId);
			if (!tab.closed) tab.close();
			onResult(data);
		};

		const check = () => {
			if (tab.closed) return finish(null);
			if (Date.now() - startTime > TIMEOUT) return finish(null);

			let data = null;
			try {
				data = parseTokenData(tab);
			} catch {
				// tab is on the provider's cross-origin page, or not loaded yet
				return;
			}
			if (!data) return;

			setTokenDataToStorage(id, data);
			finish(data);
		};

		check();
		if (!finished) intervalId = setInterval(check, INTERVAL);
	};

	const inspectToken = (id: number, onResult: (data: any) => void) => {
		const tab = window.open(getUrl(id), '_blank');
		if (!tab) {
			onResult(null);
			return;
		}

		watchSsoTab(id, tab, onResult);
	};

	return {
		getTokenDataFromStorage,
		setTokenDataToStorage,
		inspectToken,
	};
};
