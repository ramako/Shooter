import Player from "./Player";
import { Container, Ticker } from "pixi.js";
import PlayerShip from "./PlayerShip";
import EnemyManager from "./Enemy/EnemyManager";
import GreenEnemyShip from "./Enemy/GreenEnemyShip";
import PurpleEnemyShip from "./Enemy/PurpleEnemyShip";

class MainGame extends Container {
	private _player: Player = null;
	private _playerShip: PlayerShip = null;
	private _elapsedTime: number = 0;
	private _enemyManager: EnemyManager = null;
	isGameOver: boolean = null;

	constructor() {
		super();
		this._player = new Player();
		this._playerShip = new PlayerShip();
		this._enemyManager = new EnemyManager();
		this.isGameOver = false;

		this.addChild(this._player, this._playerShip, this._enemyManager);
	}

	update(ticker: Ticker) {
		// TODO Stop updating when tab changes focus.
		if (!this.isGameOver) {
			this._elapsedTime += ticker.elapsedMS;
			this._playerShip.update();
			this._enemyManager.update(this._elapsedTime);
			this.isGameOver = this._enemyManager.activeEnemyShips.some(
				(enemyShip) => {
					return this.checkBounds(this._playerShip, enemyShip);
				},
			);
		} else {
		}
	}

	checkBounds(
		playerShip: PlayerShip,
		enemyShip: GreenEnemyShip | PurpleEnemyShip,
	) {
		const playerShipBounds = playerShip.ship.getBounds();
		const enemyShipBounds = enemyShip.sprite.getBounds();
		return (
			playerShipBounds.x < enemyShipBounds.x + enemyShipBounds.width &&
			playerShipBounds.x + playerShipBounds.width > enemyShipBounds.x &&
			playerShipBounds.y < enemyShipBounds.y + enemyShipBounds.height &&
			playerShipBounds.y + playerShipBounds.height > enemyShipBounds.y
		);
	}

	reset() {
		this._player.reset();
		this._playerShip.reset();
		this._enemyManager.reset();
		this._elapsedTime = 0;
		this.isGameOver = false;
	}
}
export default MainGame;
