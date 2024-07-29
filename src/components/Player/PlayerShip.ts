import { type Application, Container, Pool, Sprite } from "pixi.js";
import AssetManager from "../../libs/AssetManager";
import ObjectRegistry from "../../libs/ObjectRegistry";
import Bullet from "./Bullet";

type settingsType = {
	speed: number;
};

const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const arrowKeys = [ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT];
const shipDefaultPosition = {
	x: 400,
	y: 500,
};

/**
 * A class for the logic of the player ship.
 * Controls the speed at which the player ship moves
 * listens for keyboard inputs to update the position of the ship on screen.
 */
class PlayerShip extends Container {
	private _ship: Sprite = null;
	private _velocity: { x: number; y: number } = null;
	private _speed: number = null;
	private _keysPressed: Map<string, boolean> = null;
	private _app: Application = null;
	private _bullets: Pool<Bullet> = null;
	private _bulletsLimit = 5;
	activeBullets: Bullet[] = [];

	constructor(settings?: settingsType) {
		super();
		this._ship = Sprite.from(AssetManager.get("PlayerShip"));
		this._ship.anchor = 0.5;
		this._ship.position.set(shipDefaultPosition.x, shipDefaultPosition.y);
		this._app = ObjectRegistry.fetch("app");
		this._bullets = new Pool(Bullet, 5);

		this._keysPressed = new Map([
			[ARROW_LEFT, false],
			[ARROW_RIGHT, false],
			[ARROW_UP, false],
			[ARROW_DOWN, false],
		]);
		this._velocity = { x: 0, y: 0 };
		this._speed = settings?.speed ?? 2;

		this.addChild(this._ship);

		document.addEventListener("keydown", (event) => this._onKeyDown(event));
		document.addEventListener("keyup", (event) => this._onKeyUp(event));
	}

	/**
	 * Getter that returns the ship sprite.
	 */
	get ship(): Sprite {
		return this._ship;
	}

	/**
	 * Update method that will check the ship is within the screen bounds
	 * amd will update the ship position based on keyboard inputs of the user.
	 */
	update(): void {
		this._ship.x += this._velocity.x;
		this._ship.y += this._velocity.y;

		if (this._ship.x < this._ship.width / 2) {
			this._ship.x = this._ship.width / 2;
		}
		if (this._ship.x > this._app.screen.width - this._ship.width / 2) {
			this._ship.x = this._app.screen.width - this._ship.width / 2;
		}
		if (this._ship.y < this._ship.height / 2) {
			this._ship.y = this._ship.height / 2;
		}
		if (this._ship.y > this._app.screen.height - this._ship.height / 2) {
			this._ship.y = this._app.screen.height - this._ship.height / 2;
		}

		for (let i = this.activeBullets.length - 1; i >= 0; i--) {
			const bullet = this.activeBullets[i];
			bullet.sprite.y -= 1;
			if (this._isBulletOutOfBounds(bullet)) {
				bullet.reset();
				this.activeBullets.splice(i, 1);
			}
		}
	}

	/**
	 * Will update the velocity based on the speed.
	 */
	updateVelocity(): void {
		this._velocity.x = 0;
		this._velocity.y = 0;

		if (this._keysPressed.get(ARROW_UP)) {
			this._velocity.y -= this._speed;
		}
		if (this._keysPressed.get(ARROW_DOWN)) {
			this._velocity.y += this._speed;
		}
		if (this._keysPressed.get(ARROW_LEFT)) {
			this._velocity.x -= this._speed;
		}
		if (this._keysPressed.get(ARROW_RIGHT)) {
			this._velocity.x += this._speed;
		}
	}

	/**
	 * Resets the velocity and ship position for a new game.
	 */
	reset(): void {
		this._ship.position.set(shipDefaultPosition.x, shipDefaultPosition.y);
		this._velocity.x = 0;
		this._velocity.y = 0;
		this.activeBullets.forEach((bullet) => {
			this.removeChild(bullet);
			this._bullets.return(bullet);
		});
		this.activeBullets.length = 0;
	}

	/**
	 * Returns if the bullet is out of bounds.
	 * @param bullet - the bullet fired by the player
	 */
	private _isBulletOutOfBounds(bullet: Bullet): boolean {
		return bullet.sprite.getGlobalPosition().y < 0;
	}

	/**
	 * Event listener for when a key is pressed down
	 *
	 * @param event - the keyboard even property containing the key pressed.
	 */
	private _onKeyDown(event: KeyboardEvent): void {
		if (arrowKeys.includes(event.key)) {
			this._keysPressed.set(event.key, true);
		}
		this.updateVelocity();
		if (event.key === " " && this._bulletsLimit > this.activeBullets.length) {
			const bullet = this._bullets.get();
			bullet.setup({
				x: this._ship.x,
				y: this._ship.y - this._ship.height / 2,
			});
			this.activeBullets.push(bullet);
			this.addChild(bullet);
		}
	}

	/**
	 * Event listener for when a key is released
	 *
	 * @param event - the keyboard even property containing the key released.
	 */
	private _onKeyUp(event: KeyboardEvent): void {
		this._keysPressed.set(event.key, false);
		this.updateVelocity();
	}
}
export default PlayerShip;
