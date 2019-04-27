import { CharacterType } from "../../../core/character";
import { SR5_World } from "./world";
import { SR_Character, Skills } from "../character";
import { rollTotal } from "../dice";
import { SR5_Weapon } from "./weapon";
import { debug, error } from "../../../log";
import { WeaponType } from "../weapon";
import { SR5_rollHits } from "./dice";
import { SR5_Damage } from "./damage";
import { DamageType } from "../damage";
import { performRangedAttack } from "./combat";

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

export class SR5_Character extends SR_Character {
    readonly sr5World: SR5_World;
    readonly attributes: Attributes;
    readonly initiativeBonus: number;
    readonly initiativeDice: number;
    readonly weapons: SR5_Weapon[];
    readonly armor: number;
    private _ammoUsed = 0;

    constructor(
        world: SR5_World,
        type: CharacterType,
        name: string,
        attributes: Attributes,
        initiativeBonus: number,
        initiativeDice: number,
        skills: Skills,
        weapons: SR5_Weapon[],
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
        performRangedAttack(this, <SR5_Character>nearestOpponent, this.weapons[0]);
    }

    dodge(): number {
        const dicePool = this.attributes.Reaction;
        return SR5_rollHits(dicePool);
    }

    resistDamage(damage: SR5_Damage) {
        const effectiveArmor = Math.max(this.armor + damage.AP, 0);
        let dicePool = this.attributes.Body + effectiveArmor;
        let damageType = damage.type ;
        if (damageType === DamageType.Physical && effectiveArmor > damage.DV) {
            damageType = DamageType.Stun;
            debug(`Damage Type reduced from Physical to Stun due to effective armor`);
        }
        const hits = SR5_rollHits(dicePool);
        const boxesOfDamage = Math.max(damage.DV - hits, 0);
        if (boxesOfDamage === 0) {
            debug(`${this.name} takes no damage`);
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

    reload(weapon: SR5_Weapon) {
        weapon.currentAmmo = weapon.maxAmmo;
        this._ammoUsed += weapon.maxAmmo;
        debug(`'${this.name}' reloading, fired ${this._ammoUsed} rounds in total`);
    }
    getWeaponSkill(weapon: SR5_Weapon): number {
        switch (weapon.type) {
            case WeaponType.LightPistol:
            case WeaponType.HeavyPistol:
                return this.getSkill("Pistols", this.attributes.Agility -1);
            case WeaponType.SMG:
            case WeaponType.AssaultRifle:
                return this.getSkill("Automatics", this.attributes.Agility -1);
            default:
                throw new Error(`Unknown weapon type '${weapon.type}'`);
        }        
    }
}