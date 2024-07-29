import { Container, Pool, type Application, type Sprite } from "pixi.js";
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

/**
 * Enemy manager class will create a pool of enemies and reuse them.
 * It will spawn enemies based on the EnemyManagerConfig.json by checking the intervals.
 * Once it is out of bounds, it will be released back into the pool.
 */
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
	spawnEnemy(spawnConfig: shipType): void {
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

	/**
	 * Updates the position of the enemies and spawns them.
	 * checks
	 * @param elapsedTime
	 */
	update(elapsedTime: number): void {
		// TODO Improvement, we do not need to iterate previous processed intervals so we can skip them.
		for (const [interval, spawnConfig] of Object.entries(
			enemySpawnConfig.intervals,
		)) {
			const intervalTime = Number.parseFloat(interval);
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
				this._returnEnemyShip(enemyShip);
				this.activeEnemyShips.splice(i, 1);
			}
		}
	}

	/**
	 * Checks if the enemy ship is out of bounds
	 */
	isOutOfBounds(enemyShip: Sprite): boolean {
		return enemyShip.y - enemyShip.width > this._app.screen.height;
	}

	/**
	 * Resets the properties of the components for a new game.
	 */
	reset(): void {
		this.activeEnemyShips.forEach((enemyShip) => {
			this._returnEnemyShip(enemyShip);
		});
		this.activeEnemyShips.length = 0;
		this._processedIntervals.clear();
	}

	/**
	 * Returns the enemy ship to the appropriate pool
	 *
	 * @param enemyShip - the enemy ship to return.
	 */
	private _returnEnemyShip(enemyShip: GreenEnemyShip | PurpleEnemyShip): void {
		if (enemyShip instanceof GreenEnemyShip) {
			this._greenEnemyShips.return(enemyShip);
		} else {
			this._purpleEnemyShips.return(enemyShip);
		}
	}
}
export default EnemyManager;
