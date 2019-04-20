import { createStreetWorld, SR3_World, createOrganizedCrimeWorld } from "./world";
import { SR3_GameMaster } from "./gamemaster";

export const streetSimulation = {
    createWorld: () => createStreetWorld(),
    createGameMaster: (world: SR3_World) => new SR3_GameMaster(world)
};

export const organizedCrimeSimulation = {
    createWorld: () => createOrganizedCrimeWorld(),
    createGameMaster: (world: SR3_World) => new SR3_GameMaster(world)
};