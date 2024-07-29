import { BitmapText, Container } from "pixi.js";
import Button from "../../libs/Button";

class GameOver extends Container {
	private readonly _text: BitmapText = null;
	private readonly _playAgainButton: Button = null;
	constructor() {
		super();
		this._text = new BitmapText({ text: "Game Over" });
		this._text.position.set(400, 200);
		this._text.anchor = 0.5;
		this._playAgainButton = new Button({
			background: { texture: "PlayAgainButton", x: 400, y: 400 },
			label: { text: "Play Again" },
			align: true,
			eventMode: "static",
		});
		this.interactive = true;

		this._playAgainButton.on("buttonClicked", this._onPlayAgain, this);

		this.addChild(this._text, this._playAgainButton);
	}

	private _onPlayAgain(): void {
		this.emit("playAgain");
	}
}
export default GameOver;
