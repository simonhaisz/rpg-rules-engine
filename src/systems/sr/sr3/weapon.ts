import { SR3_Damage, DamageLevel, ArmorType } from "./damage";
import { WeaponType, WeaponModification, FiringMode } from "../weapon";
import { DamageType } from "../damage";

export type SR3_Weapon = {
    name: string;
    type: WeaponType;
    damage: SR3_Damage;
    firingMode: FiringMode;
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
    }
};

export const CeskaBlackScorpion: SR3_Weapon = {
    name: "Ceska Black Scorpion",
    type: WeaponType.LightPistol,
    firingMode: FiringMode.BF,
    damage: {
        power: 6,
        level: DamageLevel.Light,
        type: DamageType.Physical,
        armor: ArmorType.Ballistic
    }
}

export const AresPredator: SR3_Weapon = {
    name: "Ares Predator",
    type: WeaponType.HeavyPistol,
    firingMode: FiringMode.SA,
    damage: {
        power: 9,
        level: DamageLevel.Moderate,
        type: DamageType.Physical,
        armor: ArmorType.Ballistic
    }
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
    }
}