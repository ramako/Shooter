import { Container , Sprite} from "pixi.js";
import { BitmapText } from "pixi.js";
import ObjectRegistry from "../libs/ObjectRegistry";
import AssetManager from "../libs/AssetManager";

class StartScreen extends Container {
	private _spaceShooterText: BitmapText = null;
	constructor() {
		super();
	}

	async init() {
		this._spaceShooterText = new BitmapText({
			text: "Space Shooter",
		});
		const app = ObjectRegistry.fetch('app');
		this._spaceShooterText.anchor = 0.5;
		 this._spaceShooterText.x = app.screen.width/2;
		 this._spaceShooterText.y = app.screen.height/2;

		 const sprite =  AssetManager.get('StartButton');
		const startButton = Sprite.from(sprite);
		this.addChild(this._spaceShooterText, startButton);
	}
}

export default StartScreen;
