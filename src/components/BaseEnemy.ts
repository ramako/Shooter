import { Container, Sprite } from "pixi.js";


abstract class BaseEnemy extends Container {
    protected _life : number =null;
    protected _sprite : Sprite = null;
    protected _spawnPosition : {x:0,y:0} = null;

    abstract update():void;

    protected constructor (settings) {
        super();
        this._sprite = Sprite.from(settings.texture);
    }


    update(){
        this._sprite.y+1;
    }


}
export default BaseEnemy;

