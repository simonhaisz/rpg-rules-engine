import { RangeBracket } from "./range";
import { Weapon, WeaponType } from "./weapon";
import { DamageLevel } from "./damage";

const LightPistolRange: RangeBracket = {
    Short: 5,
    Medium: 15,
    Long: 30,
    Extreme: 50
};

const HeavyPistolRange: RangeBracket = {
    Short: 5,
    Medium: 20,
    Long: 40,
    Extreme: 60
};

const Beretta201T: Weapon = {
    name: "Barreta 201T",
    type: WeaponType.LightPistol,
    damage: {
        power: 6,
        level: DamageLevel.Light
    }
};

const AresPredator: Weapon = {
    name: "Barreta 201T",
    type: WeaponType.HeavyPistol,
    damage: {
        power: 9,
        level: DamageLevel.Moderate
    }
};