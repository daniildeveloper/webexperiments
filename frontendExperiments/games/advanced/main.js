import {assets} from "libray/utilities/asset.js";

let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

assets.load(["images/hero.png"]);