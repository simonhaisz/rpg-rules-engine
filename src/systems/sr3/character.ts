import { ICharacter, CharacterState } from "../../core/character";
import { Location } from "../../core/location";

export type Attributes = {
    Body: number;
    Quickness: number;
    Strength: number;
    Charisma: number;
    Intelligence: number;
    Willpower: number;
};

export type Skills = Map<string, number>;

export type Damage = {
    Physical: number;
    Stun: number;
}

export class Character implements ICharacter {
    readonly name: string;
    private _alive = true;
    private _initiative = -1;
    private _canAct = true;
    private _attributes: Attributes;
    private _skills: Skills;
    private _location: Location;
    private _damage: Damage = {
        Physical: 0,
        Stun: 0
    };

    constructor(name: string, attributes: Attributes, skills: Skills, location: Location) {
        this.name = name;
        this._attributes = attributes;
        this._skills = skills;
        this._location = location;
    }
    getState(): CharacterState {
        return {
            alive: this._alive,
            initiative: this._initiative,
            canAct: this._canAct,
            location: { ... this._location }
        };
    }

    performAction(): void {
        throw new Error("Method not implemented.");
    }

    newRound(): void {
        throw new Error("Method not implemented.");
    }


}