import { World } from "../../../core/world";
import { SR3_Character } from "./character";
import { CharacterType } from "../../../core/character";
import { WeaponModification } from "../weapon";
import { SR3_Weapon } from "./weapon";
import { AresPredator } from "./pistols";
import { Armor } from "./damage";

export class SR3_World extends World<SR3_Character> {
}

function createGoon(world: SR3_World, n: number): SR3_Character {
    const name = `Goon ${n}`;
    const attributes = { Body: 4, Quickness: 4, Strength: 4, Charisma: 3, Intelligence: 3, Willpower: 3 };
    const initiativeBonus = 0;
    const initiativeDice = 1;
    const skills = new Map<string,number>();
    skills.set("Pistols", 3);
    const weapons: SR3_Weapon[] = [
        AresPredator
    ];
    const armor: Armor = { ballistic: 4, impact: 3 };
    return new SR3_Character(
        world,
        CharacterType.NPC,
        name,
        attributes,
        initiativeBonus,
        initiativeDice,
        skills,
        weapons,
        armor,
    );
}

function createRunner(world: SR3_World): SR3_Character {
    const name = "Runner";
    const attributes = { Body: 5, Quickness: 6, Strength: 5, Charisma: 4, Intelligence: 4, Willpower: 4 };
    const initiativeBonus = 4;
    const initiativeDice = 3;
    const skills = new Map<string,number>();
    skills.set("Pistols", 5);
    const weapons: SR3_Weapon[] = [
        { ...AresPredator, modifications: [WeaponModification.Smartlink] }
    ];
    const armor: Armor = { ballistic: 5, impact: 3 };
    return new SR3_Character(
        world,
        CharacterType.PC,
        name,
        attributes,
        initiativeBonus,
        initiativeDice,
        skills,
        weapons,
        armor
    );
}

export function createWorld(): SR3_World {
    const world = new SR3_World();

    const runner = createRunner(world);
    const goon1 = createGoon(world, 1);
    const goon2 = createGoon(world, 2);

    runner.move({ x: 0, y: 0, z: 0 });

    goon1.move({ x: 10, y: 0, z: 0 });
    goon2.move({ x: 50, y: 0, z: 0 });


    return world;
}