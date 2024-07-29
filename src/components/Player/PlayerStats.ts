import { BitmapText, Container } from "pixi.js";

type settingsType = {
	scoreCounter: number;
	livesCounter: number;
};

/**
 * PlayerStats class that will handle the score and lives left.
 */
class PlayerStats extends Container {
	private _score: BitmapText = null;
	private _lives: BitmapText = null;
	private _scoreCounter: number = null;
	private _livesCounter: number = null;
	private _settings: settingsType = null;
	constructor(settings?: settingsType) {
		super();
		this._settings = settings;
		this._scoreCounter = settings?.scoreCounter ?? 0;
		this._livesCounter = settings?.livesCounter ?? 3;
		this._score = new BitmapText({ text: `Score: ${this._scoreCounter}` });
		this._lives = new BitmapText({ text: `Lives: ${this._livesCounter}` });
		this._score.y = 560;

		this.addChild(this._score, this._lives);
	}

	/**
	 * Increases the score
	 */
	increaseScore(): void {
		this._scoreCounter++;
		this._score.text = `Score: ${this._scoreCounter}`;
	}

	/**
	 * Decreases lives left.
	 */
	decreaseLives(): void {
		this._livesCounter--;
		this._lives.text = `Lives: ${this._livesCounter}`;
	}

	/**
	 * Reset the state for a new game.
	 */
	reset(): void {
		this._scoreCounter = this._settings?.scoreCounter ?? 0;
		this._livesCounter = this._settings?.livesCounter ?? 3;
		this._score.text = `Score: ${this._scoreCounter}`;
		this._lives.text = `Lives: ${this._livesCounter}`;
	}
}
export default PlayerStats;
