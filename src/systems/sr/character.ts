import { ICharacter, CharacterType } from "../../core/character";
import { Location } from "../../core/location";
import { debug } from "../../log";
import { WeaponType } from "./weapon";

export type Skills = Map<string, number>;

export type DamageTrack = {
    PhysicalBoxes: number;
    StunBoxes: number;
}

export abstract class SR_Character implements ICharacter {
    readonly type: CharacterType;
    readonly name: string;
    readonly skills: Skills;
    protected location: Location = { x: -1, y: -1, z: -1 };
    protected damage: DamageTrack = {
        PhysicalBoxes: 0,
        StunBoxes: 0
    };
    protected initiative = -1;

    constructor(
        type: CharacterType,
        name: string,
        skills: Skills
    ) {
        this.type = type;
        this.name = name;
        this.skills = skills;
    }

    move(location: Location) {
        this.location = location;
    }

    getLocation(): Location {
        return this.location;
    }

    isAlive(): boolean {
        return this.damage.PhysicalBoxes < 10;
    }

    isConscious(): boolean {
        return this.damage.StunBoxes < 10;
    }

    canAct(): boolean {
        return this.isAlive() && this.isConscious();
    }

    getInitiative(): number {
        return this.initiative;
    }

    logState() {
        debug(`name: ${this.name} physical:${this.damage.PhysicalBoxes} stun:${this.damage.StunBoxes}`);
    }

    protected getSkill(name: string, defaultValue: number): number {
        const value = this.skills.get(name);
        if (value !== undefined) {
            return value;
        }
        return defaultValue
    }

    abstract newRound(): void;
    abstract performAction(): void;
}