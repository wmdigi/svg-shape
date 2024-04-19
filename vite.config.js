import { sveltekit } from '@sveltejs/kit/vite';
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit({
			preprocess: sveltePreprocess(),
			include: /\.component\.svelte$/,
			compilerOptions: {
			  customElement: true,
			},
			emitCss: false,
		  })
	]
};

export default config;