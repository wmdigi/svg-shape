// esbuild-bundle.js
import esbuild from "esbuild";
import sveltePlugin from "esbuild-svelte";

esbuild
	.build({
		entryPoints: ["./src/components/"],
		bundle: true,
		outfile: "dist/svg-shape.js",
		minify: true,
		plugins: [
			sveltePlugin({
				compilerOptions: {
					customElement: true,
				},
			}),
		],
		logLevel: "info",
	})
	.catch(() => process.exit(1));
