export enum DamageLevel {
    Light,
    Moderate,
    Serious,
    Deadly
}

export type Damage = {
    power: number;
    level: DamageLevel;
};