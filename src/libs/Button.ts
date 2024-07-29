import { BitmapText, Container, Sprite } from "pixi.js";
import AssetManager from "./AssetManager";

import type { EventMode, Cursor, TextOptions } from "pixi.js";

type settingsType = {
	eventMode?: EventMode;
	cursor?: Cursor;
	interactive?: boolean;
	background: {
		x: number;
		y: number;
		texture: string;
	};
	label: TextOptions;
	align?: boolean;
};

/**
 * Button class to provide some basic common functionality for any button in the game.
 */
//TODO Implement more settings through the constructor so client can modify properties even further
class Button extends Container {
	private readonly _background: Sprite = null;
	private readonly _text: BitmapText = null;
	constructor(settings: settingsType) {
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

	/**
	 * Listener for the pointerdown event.
	 *
	 */
	private _down(): void {
		this.emit("buttonClicked");
	}
}
export default Button;
