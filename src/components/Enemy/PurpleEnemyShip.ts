import BaseEnemy from "./BaseEnemy";

const settings = {
	texture: "PurpleEnemyShip",
};
class PurpleEnemyShip extends BaseEnemy {
	constructor() {
		super(settings);

		this.addChild(this._sprite);
	}
}
export default PurpleEnemyShip;
