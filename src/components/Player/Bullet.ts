import { Container, Sprite } from "pixi.js";
import AssetManager from "../../libs/AssetManager";

/**
 * Bullet class creates the bullet visual and manages all its logic.
 */
class Bullet extends Container {
	private _sprite: Sprite = null;
	constructor() {
		super();
		this._sprite = Sprite.from(AssetManager.get("Bullet"));
		this._sprite.anchor = 0.5;
		this.addChild(this._sprite);
	}

	/**
	 * Gets the sprite
	 */
	get sprite(): Sprite {
		return this._sprite;
	}

	/**
	 * Sets the position and visiblity of the bullet.
	 *
	 * @param position - the position to set the sprite to
	 */
	setup(position: { x: number; y: number }): void {
		this._sprite.position.set(position.x, position.y);
		this.visible = true;
	}

	/**
	 * Resets for a new game.
	 */
	reset(): void {
		this.visible = false;
	}
}
export default Bullet;
