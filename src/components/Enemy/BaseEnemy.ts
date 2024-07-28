import { Container, Sprite } from "pixi.js";

abstract class BaseEnemy extends Container {
	protected _life: number = null;
	protected _sprite: Sprite = null;
	_speed: number = null;

	protected constructor(settings: { texture: string }) {
		super();
		this._sprite = Sprite.from(settings.texture);
		this._sprite.anchor = 0.5;
	}

	get sprite() {
		return this._sprite;
	}

	update() {
		this._sprite.y += this._speed;
	}

	setup(settings, i: number) {
		const setting = settings[i];
		this._speed = setting.speed;
		this._sprite.position.set(setting.spawnPosition.x, setting.spawnPosition.y);
	}

	reset() {
		this._speed = 0;
		this._life = 0;
		this._sprite.position.set(0,-150);
	}
}
export default BaseEnemy;
