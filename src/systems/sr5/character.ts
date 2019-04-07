import { ICharacter, CharacterType } from "../../core/character";
import { Location } from "../../core/location";
import { World } from "./world";
import { DamageTrack } from "../sr3/character";

export type Attributes = {
    Body: number;
    Agility: number;
    Reaction: number;
    Strength: number;
    Charisma: number;
    Logic: number;
    Intuition: number;
    Willpower: number;
}

export type Skills = Map<string, number>;

export type DamagegTrack = {
    PhysicalBoxes: number;
    StunBoxes: number;
}

export class Character implements ICharacter {
    readonly world: World;
    readonly type: CharacterType;
    readonly name: string;
    readonly attributes: Attributes;
    readonly initiativeBonus: number;
    readonly initiativeDice: number;
    readonly skills: Skills;
    private _initiative = -1;
    private _location: Location = { x: -1, y: -1, z: -1 };
    private _damage: DamageTrack = {
        PhysicalBoxes: 0,
        StunBoxes: 0
    }

    constructor(
        world: World,
        type: CharacterType,
        name: string,
        attributes: Attributes,
        initiativeBonus: number,
        initiativeDice: number,
        skills: Skills
    ) {
        this.world = world;
        this.type = type;
        this.name = name;
        this.attributes = attributes;
        this.initiativeBonus = initiativeBonus;
        this.initiativeDice = initiativeDice;
        this.skills = skills;

        world.addCharacter(this);
    }

    move(location: Location) {
        this._location = location;
    }

    isAlive(): boolean {
        return this._damage.PhysicalBoxes < 10;
    }

    isConscious(): boolean {
        return this._damage.StunBoxes < 10;
    }

    canAct(): boolean {
        return this.isAlive() && this.isConscious();
    }

    getInitiative(): number {
        return this._initiative;
    }

    getLocation(): Location {
        return { ... this._location };
    }

    newRound(): void {
        if (!this.canAct()) {
            return;
        }
        this._initiative = this.attributes.Reaction + this.attributes.Intuition + this.initiativeBonus
    }

    performAction(): void {
        throw new Error("Method not implemented.");
    }
}