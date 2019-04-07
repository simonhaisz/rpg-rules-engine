import { IWorld } from "../../core/world";
import { Character } from "./character";

export class World implements IWorld {

    readonly characters: Character[] = [];

    setup() {

    }

    addCharacter(character: Character) {
        this.characters.push(character);
    }
}

export function createWorld(): World {
    const world = new World();

    return world;
}