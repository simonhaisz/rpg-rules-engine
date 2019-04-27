import { SR3_Damage, DamageLevel, ArmorType } from "./damage";
import { WeaponType, WeaponModification, FiringMode } from "../weapon";
import { DamageType } from "../damage";

export type SR3_Weapon = {
    name: string;
    type: WeaponType;
    damage: SR3_Damage;
    firingMode: FiringMode;
    maxAmmo: number;
    currentAmmo: number;
    modifications?: WeaponModification[]
};


export const BrowningHighPower: SR3_Weapon = {
    name: "Browing High-power",
    type: WeaponType.LightPistol,
    firingMode: FiringMode.SA,
    damage: {
        power: 6,
        level: DamageLevel.Light,
        type: DamageType.Physical,
        armor: ArmorType.Ballistic
    },
    maxAmmo: 20,
    currentAmmo: 20
};

export const AresPredator: SR3_Weapon = {
    name: "Ares Predator",
    type: WeaponType.HeavyPistol,
    firingMode: FiringMode.SA,
    damage: {
        power: 9,
        level: DamageLevel.Moderate,
        type: DamageType.Physical,
        armor: ArmorType.Ballistic
    },
    maxAmmo: 15,
    currentAmmo: 15
};

export const HK227: SR3_Weapon = {
    name: "HK 227",
    type: WeaponType.SMG,
    firingMode: FiringMode.BF,
    damage: {
        power: 7,
        level: DamageLevel.Moderate,
        type: DamageType.Physical,
        armor: ArmorType.Ballistic
    },
    maxAmmo: 30,
    currentAmmo: 30
}

export const ColtM23: SR3_Weapon = {
    name: "Colt M23",
    type: WeaponType.AssaultRifle,
    firingMode: FiringMode.BF,
    damage: {
        power: 8,
        level: DamageLevel.Moderate,
        type: DamageType.Physical,
        armor: ArmorType.Ballistic
    },
    maxAmmo: 40,
    currentAmmo: 40
}