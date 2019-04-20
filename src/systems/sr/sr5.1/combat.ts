import { SR5_1_Character } from "./character";
import { SR5_1_Weapon, SR5_1_WeaponType } from "./weapon";
import { WeaponModification } from "../weapon";
import { computeRange } from "../../../core/world";
import { debug } from "../../../log";
import { getRangeThreshold } from "./range";
import { SR5_rollHits } from "../sr5/dice";

export function performRangedAttack(
    attacker: SR5_1_Character,
    defender: SR5_1_Character,
    weapon: SR5_1_Weapon
    ) {
    const range = computeRange(attacker.getLocation(), defender.getLocation());
    const threshold = getRangeThreshold(range);
    const skill = attacker.attributes.Agility + attacker.getWeaponSkill(weapon);
    const dicePool = skill + getWeaponModifier(weapon);
    if (dicePool === 0) {
        debug(`'${attacker.name}' dice pool reduced to 0, cannot attack`);
        return;
    }
    const hits = SR5_rollHits(dicePool);
    // assume everyone is dodging
    const netHits = Math.max(hits - threshold - 1, 0);
    if (netHits === 0) {
        debug(`'${attacker.name}' misses attack against '${defender.name}'`);
        return;
    } else {
        debug(`'${attacker.name}' hits`)
    }
    debug(`'${attacker.name}' hits '${defender.name}' with ${JSON.stringify(weapon.damage)}`);
    defender.resistDamage(weapon.damage);
}

function getWeaponModifier(weapon: SR5_1_Weapon): number {
    let modification = 0;
    if (weapon.modifications) {
        if (weapon.modifications.includes(WeaponModification.Smartlink)) {
            modification += 3;
        } else if (weapon.modifications.includes(WeaponModification.LaserSight)) {
            modification += 2;
        }
    }
    switch (weapon.type) {
        case SR5_1_WeaponType.HandGun:
        case SR5_1_WeaponType.HandCannon:
            modification += 1;
            break;
        default:
            break;
    }
    return modification;
}