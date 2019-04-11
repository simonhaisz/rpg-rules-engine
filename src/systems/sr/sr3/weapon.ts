import { SR3_Damage } from "./damage";
import { WeaponType, WeaponModification } from "../weapon";

export type SR3_Weapon = {
    name: string;
    type: WeaponType;
    damage: SR3_Damage;
    modifications?: WeaponModification[]
};