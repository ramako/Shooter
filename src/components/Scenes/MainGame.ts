import { Container, type Sprite, type Ticker } from "pixi.js";
import PlayerStats from "../Player/PlayerStats";
import PlayerShip from "../Player/PlayerShip";
import EnemyManager from "../Enemy/EnemyManager";

/**
 * Main game class handles the logic of the game loop.
 * It will create the necessary visual components for the game
 * and checks for collisions in its update method.
 * Will delegate update logic to each component
 */
class MainGame extends Container {
	private readonly _playerStats: PlayerStats = null;
	private readonly _playerShip: PlayerShip = null;
	private readonly _enemyManager: EnemyManager = null;
	private _elapsedTime = 0;
	public isGameOver = false;

	constructor() {
		super();
		this._playerStats = new PlayerStats();
		this._playerShip = new PlayerShip();
		this._enemyManager = new EnemyManager();
		this.isGameOver = false;

		this.addChild(this._playerStats, this._playerShip, this._enemyManager);
	}

	/**
	 * Handles the updates.
	 * Will create an elapsedTime that is used to find out when the enemies need to spawn.
	 * TODO create a more accurate internal clock.
	 * @param ticker - the ticker from Pixi
	 */
	update(ticker: Ticker): void {
		// TODO Stop updating when tab changes focus.
		if (!this.isGameOver) {
			this._elapsedTime += ticker.elapsedMS;
			this._playerShip.update();
			this._enemyManager.update(this._elapsedTime);
			this.isGameOver = this._enemyManager.activeEnemyShips.some(
				(enemyShip) => {
					return this._checkCollision(this._playerShip.ship, enemyShip.sprite);
				},
			);
			this._playerShip.activeBullets.forEach((bullet) => {
				this._enemyManager.activeEnemyShips.forEach((enemyShip) => {
					const bulletCollision = this._checkCollision(
						bullet.sprite,
						enemyShip.sprite,
					);
					if (bulletCollision) {
						enemyShip.reset();
						this._playerStats.increaseScore();
					}
				});
			});
		}
	}

	/**
	 * Resets the state of the components to get ready for a new game.
	 */
	reset(): void {
		this._playerStats.reset();
		this._playerShip.reset();
		this._enemyManager.reset();
		this._elapsedTime = 0;
		this.isGameOver = false;
	}

	/**
	 * Checks for collisions
	 *
	 * @param spriteA - the first sprite to check for collision
	 * @param spriteB - the second sprite to compare against
	 */
	private _checkCollision(spriteA: Sprite, spriteB: Sprite): boolean {
		const playerShipBounds = spriteA.getBounds();
		const enemyShipBounds = spriteB.getBounds();
		return (
			playerShipBounds.x < enemyShipBounds.x + enemyShipBounds.width &&
			playerShipBounds.x + playerShipBounds.width > enemyShipBounds.x &&
			playerShipBounds.y < enemyShipBounds.y + enemyShipBounds.height &&
			playerShipBounds.y + playerShipBounds.height > enemyShipBounds.y
		);
	}
}
export default MainGame;
