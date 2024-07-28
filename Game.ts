import ObjectRegistry from "./libs/ObjectRegistry";
import { Application, type Renderer, Container } from "pixi.js";
import StartScreen from "./components/StartScreen";
import MainGame from "./components/MainGame";

type stagesNames = "startScreen" | "mainGame" | "gameOver";

class Game {
	private _startScreen: StartScreen = null;
	private _mainGame: MainGame = null;
	private _app: Application<Renderer> = null;
	private _stages: Record<stagesNames, Container> = null;
	constructor() {
		this._app = new Application();
		ObjectRegistry.register("app", this._app);
		this._startScreen = new StartScreen();
		this._mainGame = new MainGame();
	}

	async setup() {
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
		this._stages.mainGame.addChild(this._mainGame);
	}

	async startGame() {
		// create the start screen
		await this._startScreen.init();
		this._stages.startScreen.visible = false;
		this._stages.mainGame.visible = true;
		this._mainGame.start();
		this._app.ticker.add((ticker) => {
			this._mainGame.update(ticker);
		});
	}
}

export default Game;
