import { Damage } from "./damage";

export enum WeaponType {
    LightPistol,
    HeavyPistol
}

export type Weapon = {
    name: string;
    type: WeaponType;
    damage: Damage;
};