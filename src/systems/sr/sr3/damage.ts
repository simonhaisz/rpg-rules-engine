import { DamageType } from "../damage";

export enum DamageLevel {
    None,
    Light,
    Moderate,
    Serious,
    Deadly
}

export function getBoxesOfDamage(level: DamageLevel): number {
    switch(level) {
        case DamageLevel.None:
            return 0;
        case DamageLevel.Light:
            return 1;
        case DamageLevel.Moderate:
            return 3;
        case DamageLevel.Serious:
            return 6;
        case DamageLevel.Deadly:
            return 10;
    }
}

export function increaseDamageLevel(level: DamageLevel, successes: number): DamageLevel {
    const increase = Math.floor(successes / 2);
    return Math.min(level + increase, DamageLevel.Deadly);
}

export function decreaseDamageLevel(level: DamageLevel, successes: number): DamageLevel {
    const decrease = Math.floor(successes / 2);
    return Math.max(level - decrease, DamageLevel.None);
}

export enum ArmorType {
    Ballistic,
    Impact
}

export type SR3_Damage = {
    power: number;
    level: DamageLevel;
    type: DamageType;
    armor: ArmorType;
};

export type Armor = {
    ballistic: number;
    impact: number;
};

export function getEffectivePower(damage: SR3_Damage, armor: Armor): number {
    let powerReduction: number;
    switch (damage.armor) {
        case ArmorType.Ballistic:
            powerReduction = armor.ballistic;
            break;
        case ArmorType.Impact:
            powerReduction = armor.impact;
            break;
        default:
            throw new Error(`Unknown damage type '${damage.type}'`);
    }
    return damage.power - powerReduction;
}