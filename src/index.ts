import Game from "./Game";
import AssetManager from "./libs/AssetManager";
import { Application, Renderer } from "pixi.js";
import ObjectRegistry from "./libs/ObjectRegistry";

let game: Game = null;
let assetManager: AssetManager = null;

async function initialiseGame() {
	assetManager = new AssetManager({});
	// TODO Create loading screen
	await assetManager.load();
	await createApp();
	game = new Game();
	await setup();
	await game.startScreen();
	await game.startGame();
}

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
async function setup() {
	await game.setup();
}

window.onload = initialiseGame;
