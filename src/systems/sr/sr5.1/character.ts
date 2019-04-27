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
import { computeRange } from "../../../core/world";
import { AimType } from "./range";

export class SR5_1_Character extends SR_Character {
    readonly sr5World: SR5_1_World;
    readonly attributes: Attributes;
    readonly initiativeBonus: number;
    readonly initiativeDice: number;
    readonly weapons: SR5_1_Weapon[];
    readonly armor: number;
    private _ammoUsed = 0;
    private _dodging = false;
    private _aiming = false;

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

        debug(`'${this.name}' rolled ${this.initiative} for initiative`)
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
            debug(`'${this.name}' cannot perform an action because they can no longer act`);
            return;
        }
        if (this.weapons.length === 0) {
            error(`'${this.name}' has no weapons`)
            return;
        }
        const nearestOpponent = this.findNearestOpponent();
        if (nearestOpponent === null) {
            debug(`'${this.name}' has no opponents left, doing nothing`);
            return;
        }
        const distance = computeRange(this.getLocation(), nearestOpponent.getLocation());
        let aiming: AimType
        if (distance <= 20) {
            this._dodging = true;
            aiming = AimType.Snap;
        } else if (distance <= 100) {
            this._dodging = false;
            aiming = AimType.Aimed;
        } else {
            this._dodging = false;
            if (this._aiming) {
                aiming = AimType.Precision;
            } else {
                debug(`'${this.name}' taking action to aim, as target is ${distance} meters away`);
                return;
            }
        }
        performRangedAttack(this, <SR5_1_Character>nearestOpponent, this.weapons[0], aiming);
    }

    isDodging(): boolean {
        return this._dodging;
    }

    resistDamage(damage: SR5_1_Damage) {
        // TODO: Handle the auto-1's from negative armor
        const effectiveArmor = this.armor + damage.AP;
        const dicePool = this.attributes.Body + effectiveArmor;
        let damageType = damage.Type;
        if (damageType === DamageType.Physical && effectiveArmor > 0) {
            damageType = DamageType.Stun;
            debug(`Damage Type reduced from Physical to Stun due to effective armor`);
        }
        const hits = SR5_rollHits(dicePool);
        const boxesOfDamage = Math.max(damage.DV - hits, 0);
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

    reload(weapon: SR5_1_Weapon) {
        weapon.currentAmmo = weapon.maxAmmo;
        this._ammoUsed += weapon.maxAmmo;
        debug(`'${this.name}' reloading, fired ${this._ammoUsed} rounds in total`);
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