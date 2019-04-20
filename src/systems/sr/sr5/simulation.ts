import { createStreetWorld, SR5_World, createOrganizedCrimeWorld } from "./world";
import { SR5_GameMaster } from "./gamemaster";

export const streetSimulation = {
    createWorld: () => createStreetWorld(),
    createGameMaster: (world: SR5_World) => new SR5_GameMaster(world)
};

export const organizedCrimeSimulation = {
    createWorld: () => createOrganizedCrimeWorld(),
    createGameMaster: (world: SR5_World) => new SR5_GameMaster(world)
};