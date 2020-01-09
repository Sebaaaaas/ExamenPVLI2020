import Sprites from "./sprites.js";

export default class Enemy extends Sprites{
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        this.setScale(0.8, 0.8);
    }
}