import { RangeBracket } from "../range";
import { WeaponType } from "../weapon";
import { SR3_Weapon } from "./weapon";
import { DamageType } from "../damage";
import { DamageLevel, ArmorType } from "./damage";

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

export const Beretta201T: SR3_Weapon = {
    name: "Barreta 201T",
    type: WeaponType.LightPistol,
    damage: {
        power: 6,
        level: DamageLevel.Light,
        type: DamageType.Physical,
        armor: ArmorType.Ballistic
    }
};

export const AresPredator: SR3_Weapon = {
    name: "Ares Predator",
    type: WeaponType.HeavyPistol,
    damage: {
        power: 9,
        level: DamageLevel.Moderate,
        type: DamageType.Physical,
        armor: ArmorType.Ballistic
    }
};