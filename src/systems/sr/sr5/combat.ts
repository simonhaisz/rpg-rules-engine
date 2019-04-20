import { SR5_Character } from "./character";
import { SR5_Weapon } from "./weapon";
import { computeRange } from "../../../core/world";
import { WeaponModification } from "../weapon";
import { debug } from "../../../log";
import { SR5_rollHits as rollHits } from "./dice";
import { getRangeModifier } from "./range";

export function performRangedAttack(
    attacker: SR5_Character,
    defender: SR5_Character,
    weapon: SR5_Weapon
    ) {
    const range = computeRange(attacker.getLocation(), defender.getLocation());
    const skill = attacker.getWeaponSkill(weapon);
    const dicePool = Math.max(skill + getWeaponModifier(weapon) + getRangeModifier(range, weapon.type), 0);
    if (dicePool === 0) {
        debug(`'${attacker.name}' dice pool reduced to 0, cannot attack`);
        return;
    }
    const attackHits = rollHits(dicePool);
    const dodgeHits = defender.dodge();
    const netHits = Math.max(0, attackHits - dodgeHits);
    if (netHits === 0) {
        debug(`'${attacker.name}' misses attack against '${defender.name}'`);
        return;
    } else {
        debug(`'${attacker.name}' hits with ${netHits} net hits`);
    }
    const DV = weapon.damage.DV + netHits;
    const damage = {...weapon.damage, DV};
    debug(`'${attacker.name}' hits '${defender.name}' with ${JSON.stringify(damage)}`);
    defender.resistDamage(damage);
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