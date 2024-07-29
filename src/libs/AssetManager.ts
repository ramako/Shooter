import { Assets } from "pixi.js";

type spriteManifestType = {
	alias: string;
	src: string;
};

type assetsManifestType = {
	sprites: spriteManifestType[];
};

/**
 * Handles the loading of assets
 */
class AssetManager {
	private readonly _assetsManifest: assetsManifestType = null;
	constructor(manifest: assetsManifestType) {
		this._assetsManifest = manifest;
	}

	/**
	 * Gets a loaded resource
	 *
	 * @param texture - the texture we want to retrieve from the cache.
	 */
	static get(texture: string) {
		return Assets.get(texture);
	}

	/**
	 * Loads the resources.
	 */
	async load() {
		const aliases: string[] = [];
		this._assetsManifest.sprites.forEach((sprite) => {
			Assets.add(sprite);
			aliases.push(sprite.alias);
		});
		await Assets.load(aliases);
	}
}
export default AssetManager;
