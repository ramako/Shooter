import { Container, Pool, Application } from "pixi.js";
import ObjectRegistry from "../../libs/ObjectRegistry";
import GreenEnemyShip from "./GreenEnemyShip";
import PurpleEnemyShip from "./PurpleEnemyShip";

import enemySpawnConfig from "./EnemyManagerConfig.json";

type shipConfig = {
	speed: number;
	spawnPosition: { x: number; y: number };
};
type shipType = {
	type: string;
	settings: shipConfig[];
};

class EnemyManager extends Container {
	private _greenEnemyShips: Pool<GreenEnemyShip> = null;
	private _purpleEnemyShips: Pool<PurpleEnemyShip> = null;
	private _processedIntervals: Set<number> = null;
	private _app: Application = null;
	activeEnemyShips: PurpleEnemyShip[] | GreenEnemyShip[] = [];

	constructor() {
		super();
		this._greenEnemyShips = new Pool(GreenEnemyShip, 6);
		this._purpleEnemyShips = new Pool(PurpleEnemyShip, 6);
		this._processedIntervals = new Set<number>();
		this._app = ObjectRegistry.fetch("app");
	}

	// TODO Can be improved, perhaps this._greenEnemySHip and purpleEnemyShip class properties could be
	// TODO inside an object structure with the keys being the spawnConfig.type
	// for example enemiesShipsPool = {"GreenEnemyShip": new Pool(GreenEnemyShip,6), "PurpleEnemyShips":new Pool....()}
	// then can do enemiesShipsPool[spawnConfig.type]
	spawnEnemy(spawnConfig: shipType) {
		for (let i = 0; i < spawnConfig.settings.length; ++i) {
			let enemyShip = null;
			if (spawnConfig.type === "GreenEnemyShip") {
				enemyShip = this._greenEnemyShips.get();
			} else if (spawnConfig.type === "PurpleEnemyShip") {
				enemyShip = this._purpleEnemyShips.get();
			}
			enemyShip?.setup(spawnConfig.settings, i);
			this.activeEnemyShips.push(enemyShip);
			this.addChild(enemyShip);
		}
	}

	update(elapsedTime: number) {
		// TODO Improvement, we do not need to iterate previous processed intervals so we can skip them.
		for (const [interval, spawnConfig] of Object.entries(
			enemySpawnConfig.intervals,
		)) {
			const intervalTime = parseFloat(interval);
			if (
				elapsedTime >= intervalTime &&
				!this._processedIntervals.has(intervalTime)
			) {
				this._processedIntervals.add(intervalTime);
				this.spawnEnemy(spawnConfig);
			}
		}

		for (let i = this.activeEnemyShips.length - 1; i >= 0; i--) {
			const enemyShip = this.activeEnemyShips[i];
			enemyShip.update();
			if (this.isOutOfBounds(enemyShip.sprite)) {
				if (enemyShip instanceof GreenEnemyShip) {
					this._greenEnemyShips.return(enemyShip);
				} else {
					this._purpleEnemyShips.return(enemyShip);
				}
				this.activeEnemyShips.splice(i, 1);
			}
		}
	}

	/**
	 * Checks if the enemy ship is out of bounds
	 */
	isOutOfBounds(enemyShip) {
		return enemyShip.y - enemyShip.width > this._app.screen.height;
	}

	reset() {
		this.activeEnemyShips.forEach((enemyShip) => {
			enemyShip.reset();
		});
		this.activeEnemyShips.length = 0;
		this._processedIntervals.clear();
	}
}
export default EnemyManager;
