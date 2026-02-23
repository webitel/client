import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		// host: true,  // uncomment me to enable localhost access by IP (including from other devices in the network)
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				additionalData: `
          // @use "@/app/css/reusable.scss" as *;
        `,
			},
		},
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
		],
	},
	plugins: [
		vue({
			template: {
				compilerOptions: {
					compatConfig: {
						MODE: 2,
					},
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
		vueDevTools({
			launchEditor: 'webstorm',
		}),
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
		setupFiles: [
			'./tests/config/config.js',
		],
	},
});
