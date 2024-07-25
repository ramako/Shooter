import { Assets } from 'pixi.js';

class AssetManager {
	constructor(manifest) {

	}
	static get(texture:string){
		return Assets.get(texture)
	}


	async load(){
		Assets.add({alias:'StartButton', src:'../assets/StartButton.png'} );
		await Assets.load('StartButton');

	}
}
export default AssetManager;
