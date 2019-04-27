import { SR5_1_Character } from "./character";
import { SR5_1_Weapon, SR5_1_WeaponType } from "./weapon";
import { WeaponModification, FiringMode } from "../weapon";
import { computeRange } from "../../../core/world";
import { debug } from "../../../log";
import { getRangeThreshold } from "./range";
import { SR5_rollHits } from "../sr5/dice";

export function performRangedAttack(
    attacker: SR5_1_Character,
    defender: SR5_1_Character,
    weapon: SR5_1_Weapon
    ) {
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
    // assume everyone is dodging
    const threshold = getRangeThreshold(range) + 1;
    const skill = attacker.attributes.Agility + attacker.getWeaponSkill(weapon);
    const dicePool = skill + getWeaponModifier(weapon);
    if (dicePool === 0) {
        debug(`'${attacker.name}' dice pool reduced to 0, cannot attack`);
        return;
    } else if (dicePool < threshold) {
        debug(`'${attacker.name}' dice pool of ${dicePool} is less than the threshold of ${threshold - 1} - `);
        return;
    }
    const hits = SR5_rollHits(dicePool);
    const netHits = Math.max(hits - threshold, -1);
    if (netHits === -1) {
        debug(`'${attacker.name}' misses attack against '${defender.name}' - got ${hits} hits when needed ${threshold}`);
        return;
    }
    let DV = weapon.damage.DV;
    if (weapon.firingMode === FiringMode.BF && netHits > 0) {
        // assume 5 round bursts
        DV += Math.min(netHits, 2);
    }
    const damage = { ...weapon.damage, DV };
    debug(`'${attacker.name}' hits '${defender.name}' with ${hits} hits for ${JSON.stringify(damage)} damage`);
    defender.resistDamage(damage);
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
    switch (weapon.firingMode) {
        case FiringMode.SA:
            // the googles do nothing
            break;
        case FiringMode.BF:
            modification + 2;
            break;
        default:
            throw new Error(`Unknown FiringMode ${weapon.firingMode}`);
    }
    return modification;
}