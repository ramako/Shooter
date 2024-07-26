import { Container, Sprite } from "pixi.js";
import AssetManager from "../libs/AssetManager";

const arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

class PlayerShip extends Container {
	private _ship: Sprite = null;
	private _velocity: { x: number; y: number } = null;
	private _speed: number = 2;
	_keysPressed: Map<string,boolean> = new Map([["ArrowLeft", false], ["ArrowRight", false], ["ArrowUp", false], ["ArrowDown", false]]);
	constructor(settings) {
		super();
		this._ship = Sprite.from(AssetManager.get("PlayerShip"));
		this._ship.position.set(400, 500);

		this._velocity = { x: 0, y: 0 };

		this.addChild(this._ship);

		document.addEventListener("keydown", (event) => this.onKeyDown(event));
		document.addEventListener("keyup", (event) => this.onKeyUp(event));
		this._ship.getBounds();
	}

	update() {
		this._ship.x += this._velocity.x;
		this._ship.y += this._velocity.y;
        console.log(this._velocity.y, this._ship.y);
	}

	onKeyDown(event: KeyboardEvent) {
		if (arrowKeys.includes(event.key)) {
			this._keysPressed.set(event.key,true);
		}
		this.updateVelocity();
	}

	onKeyUp(event: KeyboardEvent) {
		this._keysPressed.set(event.key, false);
		this.updateVelocity();
	}

	updateVelocity() {
		this._velocity.x = 0;
		this._velocity.y = 0;

		if (this._keysPressed.get("ArrowUp")) {
			this._velocity.y -= this._speed;
		}
		if (this._keysPressed.get("ArrowDown")) {
			this._velocity.y += this._speed;
		}
		if (this._keysPressed.get("ArrowLeft")) {
			this._velocity.x -= this._speed;
		}
		if (this._keysPressed.get("ArrowRight")) {
			this._velocity.x += this._speed;
		}
	}
}
export default PlayerShip;
