// @ts-ignore
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		outDir: "dist",
	},
	server: {
		port: 8080,
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
});
