import { SR5_Character } from "./character";
import { SR5_Weapon } from "./weapon";
import { computeRange } from "../../../core/world";
import { WeaponModification } from "../weapon";
import { debug } from "../../../log";
import { SR5_rollHits as rollHits } from "./dice";

export function performRangedAttack(
    attacker: SR5_Character,
    defender: SR5_Character,
    weapon: SR5_Weapon
    ) {
    const range = computeRange(attacker.getLocation(), defender.getLocation());
    const skill = attacker.getSkill(weapon);
    const dicePool = skill + getWeaponModifier(weapon);
    const attackSuccesses = rollHits(skill);
    const dodgeSuccesses = defender.dodge(attackSuccesses);
    const totalSuccesses = Math.max(0, attackSuccesses - dodgeSuccesses);
    if (totalSuccesses === 0) {
        debug(`'${attacker.name}' misses attack against '${defender.name}'`);
        return;
    } else {
        debug(`'${attacker.name}' hits with ${totalSuccesses} successes`);
    }
    const damage = { ...weapon.damage, level };
    debug(`'${attacker.name}' hits '${defender.name}' with ${JSON.stringify(damage)}`);
    defender.resistDamage({ ...weapon.damage, level });
}

function getWeaponModifier(weapon: SR5_Weapon): number {
    if (weapon.modifications) {
        if (weapon.modifications.includes(WeaponModification.Smartlink)) {
            return 2;
        } else if (weapon.modifications.includes(WeaponModification.LaserSight)) {
            return 1;
        }
    }
    return 0;
}