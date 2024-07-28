import ObjectRegistry from "./libs/ObjectRegistry";
import { Application, type Renderer, Container } from "pixi.js";
import StartScreen from "./components/StartScreen";
import MainGame from "./components/MainGame";
import GameOver from "./components/GameOver";

type stagesNames = "startScreen" | "mainGame" | "gameOver";

class Game {
	private _startScreen: StartScreen = null;
	private _mainGame: MainGame = null;
	private _gameOver: GameOver = null;
	private _app: Application<Renderer> = null;
	private _stages: Record<stagesNames, Container> = null;
	constructor() {
		this._app = ObjectRegistry.fetch("app");
		this._startScreen = new StartScreen();
		this._mainGame = new MainGame();
		this._gameOver = new GameOver();
	}

	async setup() {
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
		this._stages.gameOver.addChild(this._gameOver);

		this._gameOver.on("playAgain", this._onPlayAgain, this);
	}

	_onPlayAgain() {
		this._mainGame.reset();
		this._stages.gameOver.visible = false;
		this._app.ticker.start();

	}

	async startScreen() {
		await this._startScreen.init();
	}

	async startGame() {
		this._stages.startScreen.visible = false;
		this._stages.mainGame.visible = true;
		this._app.ticker.add((ticker) => {
			this._mainGame.update(ticker);
			if (this._mainGame.isGameOver) {
				this._app.ticker.stop();

				this._showGameOverScreen();
			}
		});
	}

	private _showGameOverScreen() {
		this._stages.gameOver.visible = true;
	}
}

export default Game;
