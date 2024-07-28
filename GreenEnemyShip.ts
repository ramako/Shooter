import BaseEnemy from "./BaseEnemy";

const settings = {
	texture: "GreenEnemyShip",
};
class GreenEnemyShip extends BaseEnemy {
	constructor() {
		super(settings);

		this.addChild(this._sprite);
	}
}
export default GreenEnemyShip;
