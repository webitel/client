/// <reference types="vitest/config" />

import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import vueDevTools from 'vite-plugin-vue-devtools';
import { vite as vidstack } from 'vidstack/plugins';

// https://vitejs.dev/config/
export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const isStagingEnv = !!env.VITE_STAGING_ENV;

	return defineConfig({
		build: {
			sourcemap: isStagingEnv,
			minify: !isStagingEnv, // Disable minification for readable debugging
		},
		optimizeDeps: {
			include: [
				'deep-equal',
			],
		},
		server: {
			// host: true,  // uncomment me to enable localhost access by IP (including from other devices in the network)
		},
		resolve: {
			alias: {
				vue: '@vue/compat',
				'@': resolve(__dirname, 'src'),
				'@aliasedDeps/api-services/axios': resolve(
					__dirname,
					'src/app/api/instance',
				),
			},
			dedupe: [
				'vue',
				'@vue/compat',
				'vidstack',
			],
		},
		plugins: [
			vue({
				template: {
					compilerOptions: {
						compatConfig: {
							MODE: 2,
						},
						isCustomElement: (tag) => tag.startsWith('media-'),
					},
				},
			}),
			// https://www.npmjs.com/package/vite-plugin-node-polyfills
			nodePolyfills({
				// are needed for csv-parse
				include: [
					'buffer',
					'stream',
					'process',
				],
				globals: {
					Buffer: true, // can also be 'build', 'dev', or false
					process: true, // csv stringify
				},
			}),
			vidstack(),
			vueDevTools(),
			checker({
				typescript: false,
				vueTsc: false,
			}),
		],
		test: {
			globals: true,
			coverage: {
				enabled: true,
				reporter: 'json',
			},
			environment: 'happy-dom',
			// some modules read VITE_API_URL at import time (e.g. getChatOriginUrl);
			// provide a valid default so `new URL(...)` doesn't throw under test
			env: {
				VITE_API_URL: 'https://api.example.test/api',
			},
			setupFiles: [
				'./tests/config/config.js',
			],
			server: {
				deps: {
					// @webitel packages ship raw .ts source under node_modules;
					// inline them so Vite transforms the types instead of Node's loader
					inline: [
						/@webitel\//,
					],
				},
			},
		},
	});
};
