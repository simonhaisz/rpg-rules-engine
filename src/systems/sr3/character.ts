import { ICharacter, CharacterType } from "../../core/character";
import { Location } from "../../core/location";
import { Weapon, WeaponType } from "./weapon";
import { Armor, Damage, getEffectivePower, decreaseDamageLevel, DamageLevel, getBoxesOfDamage, DamageType } from "./damage";
import { rollSuccesses, rollTotal } from "./dice";
import { World } from "./world";
import { computeRange } from "../../core/world";
import { performRangedAttack } from "./combat";

export type Attributes = {
    Body: number;
    Quickness: number;
    Strength: number;
    Charisma: number;
    Intelligence: number;
    Willpower: number;
};

export type Skills = Map<string, number>;

export type DamageTrack = {
    PhysicalBoxes: number;
    StunBoxes: number;
}

export class Character implements ICharacter {
    readonly world: World;
    readonly type: CharacterType;
    readonly name: string;
    readonly attributes: Attributes;
    readonly reaction: number;
    readonly initiativeBonus: number;
    readonly initiativeDice: number;
    readonly skills: Skills;
    readonly weapons: Weapon[];
    readonly armor: Armor;
    private _initiative = -1;
    private _location: Location = { x: -1, y: -1, z: -1 };
    private _damage: DamageTrack = {
        PhysicalBoxes: 0,
        StunBoxes: 0
    };

    constructor(world: World, type: CharacterType, name: string, attributes: Attributes, initiativeBonus: number, initiativeDice: number, skills: Skills, weapons: Weapon[], armor: Armor) {
        this.world = world;
        this.type = type;
        this.name = name;
        this.attributes = attributes;
        this.reaction = Math.floor((attributes.Intelligence + attributes.Quickness) / 2);
        this.initiativeBonus = initiativeBonus;
        this.initiativeDice = initiativeDice;
        this.skills = skills;
        this.weapons = weapons;
        this.armor = armor;
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

    logState() {
        console.log(`name: ${this.name} physical:${this._damage.PhysicalBoxes} stun:${this._damage.StunBoxes}`);
    }

    newRound() {
        if (!this.canAct()) {
            return;
        }
        this._initiative = this.reaction + this.initiativeBonus + rollTotal(this.initiativeDice);
        console.log(`name: ${this.name} rolled ${this._initiative} for initiative`)
    }

    newPhase() {
        if (!this.canAct()) {
            return;
        }
        if (this._initiative > 0) {
            this._initiative -= 10;
        }
    }

    performAction() {
        const nearestOpponent = this.findNearestOpponent();
        if (nearestOpponent === null) {
            console.log(`No opponents left, doing nothing`);
            return;
        }
        performRangedAttack(this, nearestOpponent, this.weapons[0]);
    }

    resistDamage(damage: Damage) {
        const targetNumber = getEffectivePower(damage, this.armor);
        const result = rollSuccesses(this.attributes.Body, targetNumber);
        const damageLevel = decreaseDamageLevel(damage.level, result);
        if (damageLevel === DamageLevel.None) {
            console.log(`'${this.name}' takes no damage`);
            return;
        }
        const boxesOfDamage = getBoxesOfDamage(damageLevel);
        switch (damage.type) {
            case DamageType.Physical:
                this._damage.PhysicalBoxes += boxesOfDamage;
                console.log(`'${this.name}' takes ${boxesOfDamage} boxes of Physical damage`);
                break;
            case DamageType.Stun:
                this._damage.StunBoxes += boxesOfDamage;
                console.log(`'${this.name}' takes ${boxesOfDamage} boxes of Stun damage`);
                break;
        }
    }

    getSkill(weapon: Weapon): number {
        let skill;
        switch (weapon.type) {
            case WeaponType.LightPistol:
            case WeaponType.HeavyPistol:
                skill = this.skills.get("Pistols");
                break;
            default:
                throw new Error(`Unknown weapon type '${weapon.type}'`);
        }
        if (skill) {
            return skill;
        }
        return this.attributes.Quickness - 1;
    }

    findNearestOpponent(): Character | null {
        const opponentType = this.type === CharacterType.PC ? CharacterType.NPC : CharacterType.PC;
        const opponents = this.world.characters.filter(c => c.canAct() && c.type === opponentType);
        if (opponents.length === 0) {
            return null;
        } 
        opponents.sort((a, b) =>
            computeRange(this.getLocation(), a.getLocation()) - computeRange(this.getLocation(), b.getLocation())
        );
        return opponents[0];
    }
}