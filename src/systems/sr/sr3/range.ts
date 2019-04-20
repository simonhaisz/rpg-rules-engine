import { WeaponType } from "../weapon";
import { RangeBracket } from "../range";

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

export const SMGRange: RangeBracket = {
    Short: 10,
    Medium: 40,
    Long: 80,
    Extreme: 150
};

export const AssaultRifleRange: RangeBracket = {
    Short: 25,
    Medium: 150,
    Long: 350,
    Extreme: 550
};

function getRangeBracket(weaponType: WeaponType): RangeBracket {
    switch (weaponType) {
        case WeaponType.LightPistol:
            return LightPistolRange;
        case WeaponType.HeavyPistol:
            return HeavyPistolRange;
        case WeaponType.SMG:
            return SMGRange;
        case WeaponType.AssaultRifle:
            return AssaultRifleRange;
        default:
            throw new Error(`Unknown weapon type '${weaponType}'`);
    }
}

export function getTN(range: number, weaponType: WeaponType): number {
    if (range < 0) {
        throw new Error(`Range cannot be negative: ${range}`);
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
    throw new Error(`Range ${range} is outside the maximum range ${bracket.Extreme}`);
}
