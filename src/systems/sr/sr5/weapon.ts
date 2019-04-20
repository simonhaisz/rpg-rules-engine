import { SR5_Damage } from "./damage";
import { WeaponType, WeaponModification, FiringMode } from "../weapon";
import { DamageType } from "../damage";

export type SR5_Weapon = {
    name: string;
    type: WeaponType;
    firingMode: FiringMode;
    damage: SR5_Damage;
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
    }
};

export const AresPredator: SR5_Weapon = {
    name: "Ares Predator",
    type: WeaponType.HeavyPistol,
    firingMode: FiringMode.SA,
    damage: {
        DV: 8,
        AP: -1,
        type: DamageType.Physical
    }
};

export const HK227: SR5_Weapon = {
    name: "HK 227",
    type: WeaponType.SMG,
    firingMode: FiringMode.BF,
    damage: {
        DV: 7,
        AP: 0,
        type: DamageType.Physical
    }
}