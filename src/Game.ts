import { type Application, type Renderer, Container } from "pixi.js";
import ObjectRegistry from "./libs/ObjectRegistry";
import StartScreen from "./components/Scenes/StartScreen";
import MainGame from "./components/Scenes/MainGame";
import GameOver from "./components/Scenes/GameOver";

type stagesNames = "startScreen" | "mainGame" | "gameOver";

/**
 * Game class handles the main ticker update and setups the stages.
 * It handles transitions between screens
 */
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

	/**
	 * Inits the start screen and awaits for user input.
	 */
	async startScreen(): Promise<void> {
		await this._startScreen.init();
	}

	/**
	 * Starts the main game loop and lets mainGame handle the logic of the updates
	 */
	async startGame(): Promise<void> {
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

	/**
	 * Sets up the stages and events
	 */
	async setup(): Promise<void> {
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

	/**
	 * Event listener for the play again button of the Game Over screen.
	 * Will reset the state of the components and start the ticker.
	 *
	 */
	private _onPlayAgain(): void {
		this._mainGame.reset();
		this._stages.gameOver.visible = false;
		this._app.ticker.start();
	}

	/**
	 * Shows the game over screen
	 *
	 */
	private _showGameOverScreen(): void {
		this._stages.gameOver.visible = true;
	}
}

export default Game;
