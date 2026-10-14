import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type ViteDevServer } from 'vite';
import { mainVite } from './src/server/main.ts';

const graphixServer = {
	name: 'graphixServer',
	async configureServer(server: ViteDevServer) {
		await mainVite(server);
	}
};

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), graphixServer],
	server: {
		fs: {
			allow: ['./graphics']
		}
	}
});
