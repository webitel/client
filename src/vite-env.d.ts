// https://vite.dev/guide/env-and-mode#intellisense-for-typescript
/// <reference types="vite/client" />

import type { Router } from 'vue-router';

declare global {
	interface Window {
		router: Router;
	}
}
