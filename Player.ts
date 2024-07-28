import { BitmapText, Container } from "pixi.js";

class Player extends Container {
	private _score: BitmapText = null;
	private _lives: BitmapText = null;
	private _scoreCounter: number = null;
	private _livesCounter: number = null;
	private _settings = null;
	constructor(settings?) {
		super();
		this._settings = settings;
		this._scoreCounter = this._settings?.scoreCounter ?? 0;
		this._livesCounter = this._settings?.livesCounter ?? 3;
		this._score = new BitmapText({ text: `Score: ${this._scoreCounter}` });
		this._lives = new BitmapText({ text: `Lives: ${this._livesCounter}` });
		this._score.y = 560;

		this.addChild(this._score, this._lives);
	}

	increaseScore() {
		this._scoreCounter++;
		this._score.text = `Score: ${this._scoreCounter}`;
	}

	decreaseLives() {
		this._livesCounter--;
		this._lives.text = `Lives: ${this._livesCounter}`;
	}

	reset() {
		this._scoreCounter = this._settings?.scoreCounter ?? 0;
		this._livesCounter = this._settings?.livesCounter ?? 3;
		this._score.text = `Score: ${this._scoreCounter}`;
		this._lives.text = `Lives: ${this._livesCounter}`;
	}
}
export default Player;
