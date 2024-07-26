import { Assets } from "pixi.js";

class AssetManager {
	constructor(manifest) {}
	static get(texture: string) {
		return Assets.get(texture);
	}

	async load() {
		Assets.add({ alias: "StartButton", src: "../assets/StartButton.png" });
		Assets.add({ alias: "PlayerShip", src: "../assets/PlayerShip.png" });
		Assets.add({ alias: "GreenEnemyShip", src: "../assets/GreenEnemyShip.png" });
		await Assets.load(["StartButton", "PlayerShip", "GreenEnemyShip"]);
	}
}
export default AssetManager;
