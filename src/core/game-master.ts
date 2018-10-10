import { IWorld } from "./world";

export interface IGameMaster {
    getWorld(): IWorld;
    newRound(): void;
}