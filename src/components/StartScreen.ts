import { Container } from "pixi.js";
import { BitmapText } from "pixi.js";
import ObjectRegistry from "../libs/ObjectRegistry";
import Button from "../libs/Button";

class StartScreen extends Container {
	private _spaceShooterText: BitmapText = null;
	private _startButton: Button = null;
	constructor() {
		super();
	}

	async init() {
		return new Promise<void>((resolve) => {
			this._spaceShooterText = new BitmapText({
				text: "Space Shooter",
			});
			const app = ObjectRegistry.fetch("app");
			this._spaceShooterText.anchor = 0.5;
			this._spaceShooterText.x = app.screen.width / 2;
			this._spaceShooterText.y = app.screen.height / 2;

			this._startButton = new Button({
				background: { texture: "StartButton", x: app.screen.width / 2, y: 490 },
				label: { text: "Start" },
				align: "center",
				eventMode: "static",
			});

			this._startButton.on("buttonClicked", () => {
				resolve();
			});

			this.addChild(this._spaceShooterText, this._startButton);
		});
	}
}

export default StartScreen;
