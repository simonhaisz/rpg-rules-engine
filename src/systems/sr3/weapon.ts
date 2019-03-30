import { Damage } from "./damage";

export enum WeaponType {
    LightPistol,
    HeavyPistol
}

export enum WeaponModification {
    LaserSight,
    Smartlink
}

export type Weapon = {
    name: string;
    type: WeaponType;
    damage: Damage;
    modifications?: WeaponModification[]
};