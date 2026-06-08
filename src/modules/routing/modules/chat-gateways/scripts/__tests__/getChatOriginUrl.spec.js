import { afterEach, describe, expect, it, vi } from 'vitest';

import getChatOriginUrl from '../getChatOriginUrl';

describe('getChatOriginUrl', () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it('returns window.location.origin in production', () => {
		vi.stubEnv('PROD', true);
		expect(getChatOriginUrl()).toBe(window.location.origin);
	});

	it('returns the VITE_API_URL origin in development', () => {
		vi.stubEnv('PROD', false);
		vi.stubEnv('VITE_API_URL', 'https://api.example.test/api');
		expect(getChatOriginUrl()).toBe('https://api.example.test');
	});
});
