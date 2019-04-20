import { createStreetWorld, SR5_1_World, createOrganizedCrimeWorld } from "./world";
import { SR5_1_GameMaster } from "./gamemaster";

export const streetSimulation = {
    createWorld: () => createStreetWorld(),
    createGameMaster: (world: SR5_1_World) => new SR5_1_GameMaster(world)
};

export const organizedCrimeSimulation = {
    createWorld: () => createOrganizedCrimeWorld(),
    createGameMaster: (world: SR5_1_World) => new SR5_1_GameMaster(world)
};