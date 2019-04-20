import { CharacterType } from "./character";

export type GameResult = {
    winner?: CharacterType;
    numberOfRounds: number;
};
export interface IGameMaster {
    newRound(): boolean;
    getResult(): GameResult;
}

export const MAX_NUMBER_OF_ROUNDS = 20;