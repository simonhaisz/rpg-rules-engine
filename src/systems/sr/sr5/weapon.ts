import { SR5_Damage } from "./damage";
import { WeaponType, WeaponModification, FiringMode } from "../weapon";
import { DamageType } from "../damage";

export type SR5_Weapon = {
    name: string;
    type: WeaponType;
    firingMode: FiringMode;
    damage: SR5_Damage;
    maxAmmo: number;
    currentAmmo: number;
    modifications?: WeaponModification[];
};

export const BrowningHighPower: SR5_Weapon = {
    name: "Browning High-power",
    type: WeaponType.LightPistol,
    firingMode: FiringMode.SA,
    damage: {
        DV: 6,
        AP: 0,
        type: DamageType.Physical
    },
    maxAmmo: 20,
    currentAmmo: 20
};

export const AresPredator: SR5_Weapon = {
    name: "Ares Predator",
    type: WeaponType.HeavyPistol,
    firingMode: FiringMode.SA,
    damage: {
        DV: 8,
        AP: -1,
        type: DamageType.Physical
    },
    maxAmmo: 15,
    currentAmmo: 15
};

export const HK227: SR5_Weapon = {
    name: "HK 227",
    type: WeaponType.SMG,
    firingMode: FiringMode.BF,
    damage: {
        DV: 7,
        AP: 0,
        type: DamageType.Physical
    },
    maxAmmo: 30,
    currentAmmo: 30
}

export const ColtM23: SR5_Weapon = {
    name: "Colt M23",
    type: WeaponType.AssaultRifle,
    firingMode: FiringMode.BF,
    damage: {
        DV: 9,
        AP: -2,
        type: DamageType.Physical
    },
    maxAmmo: 40,
    currentAmmo: 40
}