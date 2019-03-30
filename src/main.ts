import { System } from "./core/system";
import { createWorld } from "./systems/sr3/world";
import { GameMaster } from "./systems/sr3/game-master";

const system = System.SR3;
const gm = new GameMaster(createWorld());
for ( ; ; ) {
    if (!gm.newRound()) {
        break;
    }
}
console.log(`${system} scenario finished`);