import Sprites from "./sprites.js";

export default class Rectangle extends Sprites{
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        this.setScale(1.5, 0.5);
    }
}