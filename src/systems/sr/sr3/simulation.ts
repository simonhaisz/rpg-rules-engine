import { createWorld, SR3_World } from "./world";
import { SR3_GameMaster } from "./game-master";

export const standardSimulation = {
    createWorld: () => createWorld(),
    createGameMaster: (world: SR3_World) => new SR3_GameMaster(world)
};