import { SR5_Damage } from "./damage";
import { WeaponType, WeaponModification } from "../weapon";

export type SR5_Weapon = {
    name: string;
    type: WeaponType;
    damage: SR5_Damage;
    modifications?: WeaponModification[];
}