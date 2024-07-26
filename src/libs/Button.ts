import { BitmapText, Container, Sprite } from "pixi.js";
import AssetManager from "./AssetManager";

//TODO Implement more settings through the constructor so client can modify properties even further
class Button extends Container {
	private _background: Sprite = null;
	private _text: BitmapText = null;
	constructor(settings) {
		super();

		this.eventMode = settings.eventMode ?? "auto";
		this.cursor = settings.cursor ?? "pointer";
		this.interactive = settings.interactive ?? true;

		this._background = Sprite.from(
			AssetManager.get(settings.background.texture),
		);
		this._background.anchor = 0.5;

		this._text = new BitmapText(settings.label);
		this._text.anchor = 0.5;

		this._background.position.set(settings.background.x, settings.background.y);

		if ("align" in settings) {
			this._text.position.set(this._background.x, this._background.y);
		}

		this.addChild(this._background, this._text);

		// Event and click handling
		this.on("pointerdown", this._down, this);
	}

	private _down() {
		this.emit("buttonClicked");
	}
}
export default Button;
