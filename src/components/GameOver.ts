import { BitmapText, Container } from "pixi.js";
import Button from "../libs/Button";

class GameOver extends Container {
	private _text: BitmapText = null;
	private _playAgainButton: Button = null;
	constructor() {
		super();
	}
}
export default GameOver;
