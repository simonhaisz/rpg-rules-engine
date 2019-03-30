export enum CharacterType {
    PC,
    NPC
}

export interface ICharacter {
    readonly type: CharacterType;
    readonly name: string;
    performAction(): void;
    newRound(): void;
}