import { info, debug } from "../../../log";
import { CharacterType } from "../../../core/character";
import { SR3_Weapon } from "./weapon";
import { Armor, SR3_Damage, getEffectivePower, decreaseDamageLevel, DamageLevel, getBoxesOfDamage } from "./damage";
import { rollSuccesses } from "./dice";
import { SR3_World } from "./world";
import { computeRange } from "../../../core/world";
import { performRangedAttack } from "./combat";
import { SR_Character, Skills } from "../character";
import { rollTotal } from "../dice";
import { WeaponType } from "../weapon";
import { DamageType } from "../damage";

export type Attributes = {
    Body: number;
    Quickness: number;
    Strength: number;
    Charisma: number;
    Intelligence: number;
    Willpower: number;
};

export class SR3_Character extends SR_Character {
    readonly world: SR3_World;
    readonly attributes: Attributes;
    readonly reaction: number;
    readonly initiativeBonus: number;
    readonly initiativeDice: number;
    readonly combatPoolDice: number;
    readonly weapons: SR3_Weapon[];
    readonly armor: Armor;
    private _combatPool = -1;

    constructor(
        world: SR3_World,
        type: CharacterType,
        name: string,
        attributes: Attributes,
        initiativeBonus: number,
        initiativeDice: number,
        skills: Skills,
        weapons: SR3_Weapon[],
        armor: Armor
    ) {
        super(type, name, skills);
        this.world = world;
        this.attributes = attributes;
        this.reaction = Math.floor((attributes.Intelligence + attributes.Quickness) / 2);
        this.initiativeBonus = initiativeBonus;
        this.initiativeDice = initiativeDice;
        this.combatPoolDice = Math.floor((attributes.Quickness + attributes.Intelligence + attributes.Willpower) /2);
        this.weapons = weapons;
        this.armor = armor;
        world.addCharacter(this);
    }

    newRound() {
        if (!this.canAct()) {
            return;
        }
        this.initiative =
            this.reaction +
            this.initiativeBonus +
            rollTotal(this.initiativeDice);
        this._combatPool = this.combatPoolDice;
        debug(`name: ${this.name} rolled ${this.initiative} for initiative`)
    }

    newPhase() {
        if (!this.canAct()) {
            return;
        }
        if (this.initiative > 0) {
            this.initiative -= 10;
        }
    }

    performAction() {
        if (this.weapons.length === 0) {
            return;
        }
        const nearestOpponent = this.findNearestOpponent();
        if (nearestOpponent === null) {
            debug(`No opponents left, doing nothing`);
            return;
        }
        performRangedAttack(this, nearestOpponent, this.weapons[0]);
    }

    dodge(attackSuccesses: number): number {
        if (this._combatPool < 1) {
            return 0;
        }
        const dodgeDice = Math.min(this._combatPool, Math.ceil(attackSuccesses / 2));
        this._combatPool -= dodgeDice;
        return rollSuccesses(dodgeDice, 4);
    }

    resistDamage(damage: SR3_Damage) {
        const targetNumber = getEffectivePower(damage, this.armor);
        const result = rollSuccesses(this.attributes.Body, targetNumber);
        const damageLevel = decreaseDamageLevel(damage.level, result);
        if (damageLevel === DamageLevel.None) {
            debug(`'${this.name}' takes no damage`);
            return;
        }
        const boxesOfDamage = getBoxesOfDamage(damageLevel);
        switch (damage.type) {
            case DamageType.Physical:
                this.damage.PhysicalBoxes += boxesOfDamage;
                debug(`'${this.name}' takes ${boxesOfDamage} boxes of Physical damage`);
                break;
            case DamageType.Stun:
                this.damage.StunBoxes += boxesOfDamage;
                debug(`'${this.name}' takes ${boxesOfDamage} boxes of Stun damage`);
                break;
        }
    }

    getWeaponSkill(weapon: SR3_Weapon): number {
        switch (weapon.type) {
            case WeaponType.LightPistol:
            case WeaponType.HeavyPistol:
                return this.getSkill("Pistols", this.attributes.Quickness -1);
            default:
                throw new Error(`Unknown weapon type '${weapon.type}'`);
        }
    }

    findNearestOpponent(): SR3_Character | null {
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