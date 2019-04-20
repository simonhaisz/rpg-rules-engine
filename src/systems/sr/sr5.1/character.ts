import { Attributes } from "../sr5/character";
import { SR5_1_World } from "./world";
import { CharacterType } from "../../../core/character";
import { Skills, SR_Character } from "../character";
import { SR5_1_Weapon, SR5_1_WeaponType } from "./weapon";
import { debug, error } from "../../../log";
import { performRangedAttack } from "./combat";
import { rollTotal } from "../dice";
import { SR5_1_Damage } from "./damage";
import { DamageType } from "../damage";
import { SR5_rollHits } from "../sr5/dice";

export class SR5_1_Character extends SR_Character {
    readonly sr5World: SR5_1_World;
    readonly attributes: Attributes;
    readonly initiativeBonus: number;
    readonly initiativeDice: number;
    readonly weapons: SR5_1_Weapon[];
    readonly armor: number;

    constructor(
        world: SR5_1_World,
        type: CharacterType,
        name: string,
        attributes: Attributes,
        initiativeBonus: number,
        initiativeDice: number,
        skills: Skills,
        weapons: SR5_1_Weapon[],
        armor: number
    ) {
        super(world, type, name, skills);
        this.sr5World = world;
        this.attributes = attributes;
        this.initiativeBonus = initiativeBonus;
        this.initiativeDice = initiativeDice;
        this.weapons = weapons;
        this.armor = armor;
        world.addCharacter(this);
    }

    newRound() {
        if (!this.canAct()) {
            return;
        }
        this.initiative = 
            this.attributes.Reaction +
            this.attributes.Intuition +
            this.initiativeBonus +
            rollTotal(this.initiativeDice);
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
        if (!this.canAct()) {
            debug(`${this.name} cannot perform and action because they can no longer act`);
            return;
        }
        if (this.weapons.length === 0) {
            error(`${this.name} has no weapons`)
            return;
        }
        const nearestOpponent = this.findNearestOpponent();
        if (nearestOpponent === null) {
            debug(`No opponents left, doing nothing`);
            return;
        }
        performRangedAttack(this, <SR5_1_Character>nearestOpponent, this.weapons[0]);
    }

    resistDamage(damage: SR5_1_Damage) {
        // TODO: Handle the auto-1's from negative armor
        const effectiveArmor = Math.max(this.armor + damage.AP, 0);
        const dicePool = this.attributes.Body + effectiveArmor;
        let damageType = damage.Type;
        if (damageType === DamageType.Physical && effectiveArmor > 0) {
            damageType = DamageType.Stun;
            debug(`Damage Type reduced from Physical to Stun due to effective armor`);
        }
        const hits = SR5_rollHits(dicePool);
        const boxesOfDamage = Math.max(damage.DV, - hits, 0);
        if (boxesOfDamage === 0) {
            debug(`${this.name} takes no damageg`);
            return;
        }
        switch (damageType) {
            case DamageType.Physical:
                this.damage.PhysicalBoxes += boxesOfDamage;
                debug(`'${this.name}' takes ${boxesOfDamage} boxes of Physical damage`);
                break;
            case DamageType.Stun:
                this.damage.StunBoxes += boxesOfDamage;
                debug(`'${this.name}' takes ${boxesOfDamage} boxes of Stun damage`);
                break;
            default:
                throw new Error(`Unknown DamageType ${damageType}`);
        }
    }

    getWeaponSkill(weapon: SR5_1_Weapon): number {
        switch (weapon.type) {
            case SR5_1_WeaponType.HandGun:
            case SR5_1_WeaponType.HandCannon:
                return this.getSkill("Pistols", this.attributes.Agility -1);
            case SR5_1_WeaponType.SMG:
            case SR5_1_WeaponType.AssaultRifle:
                return this.getSkill("Automatics", this.attributes.Agility -1);
            default:
                throw new Error(`Unknown weapon type '${weapon.type}'`);
        }
    }
}