import { BitmapText, Container } from "pixi.js";
import Button from "../libs/Button";

class GameOver extends Container {
	private _text: BitmapText = null;
	private _playAgainButton: Button = null;
	constructor() {
		super();
		this._text = new BitmapText({ text: "Game Over" });
		this._text.position.set(400, 200);
		this._text.anchor = 0.5;
		this._playAgainButton = new Button({
			background: { texture: "PlayAgainButton" },
			label: { text: "Play Again" },
			eventMode: "static",
		});
		this._playAgainButton.position.set(400, 400);
		this.interactive = true;

		this._playAgainButton.on("buttonClicked", this._onPlayAgain, this);

		this.addChild(this._text, this._playAgainButton);
	}

	_onPlayAgain(): void {
		this.emit("playAgain");
	}
}
export default GameOver;
