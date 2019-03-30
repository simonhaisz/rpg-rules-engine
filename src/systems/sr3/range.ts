import { WeaponType } from "./weapon";
import { LightPistolRange, HeavyPistolRange } from "./pistols";

export type RangeBracket = {
    Short: number;
    Medium: number;
    Long: number;
    Extreme: number;
};

export function getRangeBracket(weaponType: WeaponType): RangeBracket {
    switch (weaponType) {
        case WeaponType.LightPistol:
            return LightPistolRange;
        case WeaponType.HeavyPistol:
            return HeavyPistolRange;
        default:
            throw new Error(`Unknown weapon type '${weaponType}'`);
    }
}

export function getTN(range: number, weaponType: WeaponType): number {
    if (range < 0) {
        throw new Error(`Range cannot be negative`);
    }
    const bracket = getRangeBracket(weaponType);
    if (range <= bracket.Short) {
        return 4;
    }
    if (range <= bracket.Medium) {
        return 5;
    }
    if (range <= bracket.Long) {
        return 6;
    }
    if (range <= bracket.Extreme) {
        return 9;
    }
    // possible for target to be out of range - needs to be handled by system
    return -1;
}
