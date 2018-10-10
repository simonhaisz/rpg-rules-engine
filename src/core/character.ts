import { Location } from "./location";

export type CharacterState = {
    alive: boolean;
    initiative: number;
    canAct: boolean;
    location: Location;
};

export interface ICharacter {
    name: string;
    getState(): CharacterState;
    performAction(): void;
    newRound(): void;
}