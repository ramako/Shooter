import { type Application, Container } from "pixi.js";
import { BitmapText } from "pixi.js";
import ObjectRegistry from "../../libs/ObjectRegistry";
import Button from "../../libs/Button";

class StartScreen extends Container {
	private readonly _spaceShooterText: BitmapText = null;
	private readonly _startButton: Button = null;
	constructor() {
		super();
		this._spaceShooterText = new BitmapText({
			text: "Space Shooter",
		});
		const app = ObjectRegistry.fetch<Application>("app");
		this._spaceShooterText.anchor = 0.5;
		this._spaceShooterText.x = app.screen.width / 2;
		this._spaceShooterText.y = app.screen.height / 2;

		this._startButton = new Button({
			background: { texture: "StartButton", x: app.screen.width / 2, y: 490 },
			label: { text: "Start" },
			align: true,
			eventMode: "static",
		});
		this.addChild(this._spaceShooterText, this._startButton);
	}

	async init(): Promise<void> {
		return new Promise<void>((resolve) => {
			this._startButton.on("buttonClicked", () => {
				resolve();
			});
		});
	}
}

export default StartScreen;
