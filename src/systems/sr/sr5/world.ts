import { World } from "../../../core/world";
import { SR5_Character } from "./character";

export class SR5_World extends World<SR5_Character> {
}

export function createWorld(): SR5_World {
    const world = new SR5_World();

    return world;
}