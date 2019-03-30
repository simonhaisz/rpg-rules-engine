import { RangeBracket } from "./range";
import { Weapon, WeaponType } from "./weapon";
import { DamageLevel, ArmorType, DamageType } from "./damage";

export const LightPistolRange: RangeBracket = {
    Short: 5,
    Medium: 15,
    Long: 30,
    Extreme: 50
};

export const HeavyPistolRange: RangeBracket = {
    Short: 5,
    Medium: 20,
    Long: 40,
    Extreme: 60
};

export const Beretta201T: Weapon = {
    name: "Barreta 201T",
    type: WeaponType.LightPistol,
    damage: {
        power: 6,
        level: DamageLevel.Light,
        type: DamageType.Physical,
        armor: ArmorType.Ballistic
    }
};

export const AresPredator: Weapon = {
    name: "Ares Predator",
    type: WeaponType.HeavyPistol,
    damage: {
        power: 9,
        level: DamageLevel.Moderate,
        type: DamageType.Physical,
        armor: ArmorType.Ballistic
    }
};