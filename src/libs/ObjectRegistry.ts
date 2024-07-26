abstract class ObjectRegistry {
	private static _objects: Map<string, any> = new Map();

	static register<T>(key: string, object: T) {
		ObjectRegistry._objects.set(key, object);
	}

	static fetch(key: string) {
		return ObjectRegistry._objects.get(key);
	}
}
export default ObjectRegistry;
