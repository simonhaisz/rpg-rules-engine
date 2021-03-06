import { SR5_1_Damage } from "./damage";
import { WeaponModification, FiringMode, WeaponType } from "../weapon";
import { DamageType } from "../damage";

export enum SR5_1_WeaponType {
    HandGun = "Hand-gun",
    HandCannon = "Hand-cannon",
    SMG = "Sub-machine Gun",
    AssaultRifle = "Assault-rifle"
}

export type SR5_1_Weapon = {
    name: string;
    type: SR5_1_WeaponType;
    firingMode: FiringMode;
    damage: SR5_1_Damage;
    maxAmmo: number;
    currentAmmo: number;
    modifications?: WeaponModification[];
};

export const BrowningHighPower: SR5_1_Weapon = {
    name: "Browning High-power",
    type: SR5_1_WeaponType.HandGun,
    firingMode: FiringMode.SA,
    damage: {
        DV: 5,
        AP: -1,
        Type: DamageType.Physical
    },
    maxAmmo: 20,
    currentAmmo: 20
};

export const AresPredator: SR5_1_Weapon = {
    name: "Ares Predator",
    type: SR5_1_WeaponType.HandCannon,
    firingMode: FiringMode.SA,
    damage: {
        DV: 6,
        AP: -2,
        Type: DamageType.Physical
    },
    maxAmmo: 10,
    currentAmmo: 10
};

export const HK_227: SR5_1_Weapon = {
    name: "HK 227",
    type: SR5_1_WeaponType.SMG,
    firingMode: FiringMode.BF,
    damage: {
        DV: 5,
        AP: -1,
        Type: DamageType.Physical
    },
    maxAmmo: 40,
    currentAmmo: 40
};

export const ColtM23: SR5_1_Weapon = {
    name: "Colt M23",
    type: SR5_1_WeaponType.SMG,
    firingMode: FiringMode.BF,
    damage: {
        DV: 5,
        AP: -5,
        Type: DamageType.Physical
    },
    maxAmmo: 40,
    currentAmmo: 40
};