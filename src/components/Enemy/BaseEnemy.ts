import { Container, Sprite } from "pixi.js";

type settingsType = {
	texture: string;
	anchor?: number;
	life?: number;
};

const defaultPosition = { x: 0, y: -150 };
/**
 * Abstract class to define a base enemy.
 */
abstract class BaseEnemy extends Container {
	protected _life: number = null;
	protected _sprite: Sprite = null;
	protected _speed: number = null;

	protected constructor(settings: settingsType) {
		super();
		this._sprite = Sprite.from(settings.texture);
		this._sprite.anchor = settings.anchor ?? 0.5;
		this._life = settings.life ?? 1;
		this.visible = false;
	}

	/**
	 * Returns this sprite
	 */
	get sprite(): Sprite {
		return this._sprite;
	}

	/**
	 * Basic updates to position. Can be overriden by specific enemies for mroe complicated paths.
	 */
	update(): void {
		this._sprite.y += this._speed;
	}

	/**
	 * Sets up the speed and the spawn position of the enemy.
	 *
	 * @param settings - settings containing an array of enemies each one can have a diff config.
	 * @param i - the index of the specific enemy in the array of enemies
	 */
	setup(
		settings: { speed: number; spawnPosition: { x: number; y: number } }[],
		i: number,
	): void {
		const setting = settings[i];
		this._speed = setting.speed;
		this._sprite.position.set(setting.spawnPosition.x, setting.spawnPosition.y);
		this.visible = true;
	}

	/**
	 * Resets the state for a new game.
	 */
	reset(): void {
		this._speed = 0;
		this._life = 0;
		this.visible = false;
		this._sprite.position.set(defaultPosition.x, defaultPosition.y);
	}
}
export default BaseEnemy;
