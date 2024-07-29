/**
 * Abstract class to make it static and only use it to access its static methods.
 */
abstract class ObjectRegistry {
	private static _objects: Map<string, unknown> = new Map();

	/**
	 * Registers an object
	 *
	 * @param key - The key we want to use to register it as
	 * @param object - the object to register
	 */
	static register<T>(key: string, object: T) {
		ObjectRegistry._objects.set(key, object);
	}

	/**
	 * Fetches a registered object
	 *
	 * @param key - The key we used when we registered the object.
	 */
	static fetch<T>(key: string): T {
		return ObjectRegistry._objects.get(key) as T;
	}
}
export default ObjectRegistry;
