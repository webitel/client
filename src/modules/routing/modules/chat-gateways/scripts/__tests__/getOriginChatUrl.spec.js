import getChatOriginUrl from '../getChatOriginUrl';

describe('getChatOriginUrl', () => {
	it('returns window.location.origin in production', () => {
		const origin = 'vi.test.dev';
		window.location = {
			origin,
		};
		import.meta.env.PROD = true;
		expect(getChatOriginUrl()).toBe(origin);
	});

	it('returns "https://dev.webitel.com" in development', () => {
		import.meta.env.PROD = false;
		expect(getChatOriginUrl()).toBe('https://dev.webitel.com');
	});
});
