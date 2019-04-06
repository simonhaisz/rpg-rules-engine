import { createWorld, World } from "./world";
import { GameMaster } from "./game-master";

export const standardSimulation = {
    createWorld: () => createWorld(),
    createGameMaster: (world: World) => new GameMaster(world)
};