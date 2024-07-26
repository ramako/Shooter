import Player from "./Player";
import { Container, Pool } from "pixi.js";
import PlayerShip from "./PlayerShip";
import GreenEnemyShip from "./GreenEnemyShip";

class MainGame extends Container {
	private _player: Player = null;
	private _playerShip: PlayerShip = null;
	private _greenEnemyShips : Pool<GreenEnemyShip> = null;

	constructor() {
		super();
		this._player = new Player();
		this._playerShip = new PlayerShip();
		this._greenEnemyShips = new Pool(GreenEnemyShip,6);
		this._enemyShip = this._greenEnemyShips.get();
		this.addChild(this._enemyShip);
		console.log(this._greenEnemyShips.totalFree);

		console.log("executing main game", this._greenEnemyShips );
		this.addChild(this._player, this._playerShip);
	}

	start() {}

	update(ticker) {
		this._playerShip.update();
		this._enemyShip.y+= 1;
		//console.log(enemyShip.y)

	}

	checkBounds(playerShip, enemyShips){

	}
}
export default MainGame;
