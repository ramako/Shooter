import { Application } from "pixi.js";
import AssetManager from "./libs/AssetManager";
import ObjectRegistry from "./libs/ObjectRegistry";
import Game from "./Game";

import AssetManifest from "./AssetManifest.json";

let game: Game = null;
let assetManager: AssetManager = null;

/**
 * Function to initialize the game and upload assets.
 */
async function initialiseGame() {
	assetManager = new AssetManager(AssetManifest);
	// TODO Create loading screen when loading assets
	await assetManager.load();
	await createApp();
	game = new Game();
	await setup();
	await game.startScreen();
	await game.startGame();
}

/**
 * Creates and inits the pixi app.
 */
async function createApp() {
	const app = new Application();
	ObjectRegistry.register("app", app);
	await app.init({
		background: "#1099bb",
		autoStart: true,
		clearBeforeRender: true,
		powerPreference: "high-performance",
	});
	document.body.appendChild(app.canvas);
}

/**
 * Sets up the game stages
 */
async function setup() {
	await game.setup();
}

window.onload = initialiseGame;
