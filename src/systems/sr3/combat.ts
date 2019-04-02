import { info, debug } from "../../log";
import { Character } from "./character";
import { computeRange } from "../../core/world";
import { getTN } from "./range";
import { Weapon, WeaponModification } from "./weapon";
import { rollSuccesses } from "./dice";
import { increaseDamageLevel } from "./damage";

export function performRangedAttack(attacker: Character, defender: Character, weapon: Weapon) {
    const range = computeRange(attacker.getLocation(), defender.getLocation());
    const targetNumber = getTN(range, weapon.type) + getAttackBonus(weapon);
    const skill = attacker.getSkill(weapon);
    const successes = rollSuccesses(skill, targetNumber);
    if (successes === 0) {
        debug(`'${attacker.name}' misses attack against '${defender.name}'`);
        return;
    } else {
        debug(`'${attacker.name}' hits with ${successes} successes`);
    }
    const level = increaseDamageLevel(weapon.damage.level, successes);
    const damage = { ...weapon.damage, level };
    debug(`'${attacker.name}' hits '${defender.name}' with ${JSON.stringify(damage)}`);
    defender.resistDamage({ ...weapon.damage, level });
}

function getAttackBonus(weapon: Weapon): number {
    if (weapon.modifications) {
        if (weapon.modifications.includes(WeaponModification.Smartlink)) {
            return -2;
        } else if (weapon.modifications.includes(WeaponModification.LaserSight)) {
            return -1;
        }
    }
    return 0;
}