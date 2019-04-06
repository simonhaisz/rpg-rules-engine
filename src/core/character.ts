export enum CharacterType {
    PC = "PC",
    NPC = "NPC"
}

export interface ICharacter {
    readonly type: CharacterType;
    readonly name: string;
    performAction(): void;
    newRound(): void;
}