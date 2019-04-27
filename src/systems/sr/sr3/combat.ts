import { info, debug } from "../../../log";
import { SR3_Character } from "./character";
import { computeRange } from "../../../core/world";
import { getTN } from "./range";
import { SR3_Weapon } from "./weapon";
import { rollSuccesses } from "./dice";
import { resolveDamage } from "./damage";
import { WeaponModification, FiringMode } from "../weapon";

export function performRangedAttack(attacker: SR3_Character, defender: SR3_Character, weapon: SR3_Weapon) {
    if (weapon.currentAmmo === 0) {
        attacker.reload(weapon);
        return;
    } else {
        switch (weapon.firingMode) {
            case FiringMode.SA:
                weapon.currentAmmo -= 1;
                break;
            case FiringMode.BF:
                weapon.currentAmmo -= 5;
                break;
        }
    }
    const range = computeRange(attacker.getLocation(), defender.getLocation());
    const targetNumber = getTN(range, weapon.type) + getAttackBonus(weapon);
    const skill = attacker.getWeaponSkill(weapon);
    const attackSuccesses = rollSuccesses(skill, targetNumber);
    const dodgeSuccesses = defender.dodge(attackSuccesses);
    const totalSuccesses = Math.max(0, attackSuccesses - dodgeSuccesses);
    if (totalSuccesses === 0) {
        debug(`'${attacker.name}' misses attack against '${defender.name}'`);
        return;
    } else {
        debug(`'${attacker.name}' hits with ${totalSuccesses} successes`);
    }
    let damage = resolveDamage(weapon.damage, weapon.firingMode, totalSuccesses);
    debug(`'${attacker.name}' hits '${defender.name}' with ${JSON.stringify(damage)}`);
    defender.resistDamage(damage);
}

function getAttackBonus(weapon: SR3_Weapon): number {
    if (weapon.modifications) {
        if (weapon.modifications.includes(WeaponModification.Smartlink)) {
            return -2;
        } else if (weapon.modifications.includes(WeaponModification.LaserSight)) {
            return -1;
        }
    }
    return 0;
}