import Game from "./Game";
import AssetManager from "./libs/AssetManager";

let game: Game = null;
let assetManager : AssetManager = null;

async function initialiseGame() {
	assetManager = new AssetManager({});
	// TODO Create loading screen
	await assetManager.load();
	game = new Game();
	await setup();
	game.startGame();
}
async function setup() {
	await game.setup();
}

window.onload = initialiseGame;
