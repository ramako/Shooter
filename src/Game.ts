import StartScreen from "./components/StartScreen";
import ObjectRegistry from './libs/ObjectRegistry';
import { Application, type Renderer, Container } from "pixi.js";

type stagesNames = "startScreen" | "mainGame" | "gameOver";

class Game {
	private _startScreen: StartScreen = null;
	private _app: Application<Renderer> = null;
	private _stages: Record<stagesNames, Container> = null;
	constructor() {
		this._startScreen = new StartScreen();
	}

	async setup() {
		this._app = new Application();
		ObjectRegistry.register('app', this._app);

		await this._app.init({
			background: "#1099bb",
			autoStart: true,
			clearBeforeRender: true,
			powerPreference: "high-performance",
		});
		document.body.appendChild(this._app.canvas);

		this._stages = {
			startScreen: new Container(),
			mainGame: new Container(),
			gameOver: new Container(),
		};

		this._app.stage.addChild(
			this._stages.startScreen,
			this._stages.mainGame,
			this._stages.gameOver,
		);

		this._stages.mainGame.visible = false;
		this._stages.gameOver.visible = false;

		this._stages.startScreen.addChild(this._startScreen);
	}

	startGame() {
		// create the start screen
		this._startScreen.init();
	}
}

export default Game;
