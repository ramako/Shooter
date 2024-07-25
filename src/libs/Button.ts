import { BitmapText, Container, Sprite } from "pixi.js";



class Button extends Container{
    private _background : Sprite = null;
    private _text : BitmapText = null;
    constructor(settings) {
        super();
        this._background = new Sprite( settings.background );
        this._text = new BitmapText(settings.text);

        this.addChild(this._background, this._text);

        // Event and click handling
        this.on( 'pointerdown', this._down, this );
        // this.on( Container.EVENTS.POINTER_UP, this._up, this );
        // this.on( Container.EVENTS.POINTER_OVER, this._over, this );
        // this.on( Container.EVENTS.POINTER_OUT, this._out, this );

    }


    private _down(){
        console.log("bang");
    }


}
export default Button;
