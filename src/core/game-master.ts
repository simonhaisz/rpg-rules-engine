import { CharacterType } from "./character";

export type GameResult = {
    winner?: CharacterType;
    numberOfRounds: number;
};
export interface IGameMaster {
    newRound(): boolean;
    getResult(): GameResult;
}