import { World } from "../../../core/world";
import { SR5_1_Character } from "./character";
import { SR5_1_Weapon, AresPredator, BrowningHighPower, HKMP9, ColtM23 } from "./weapon";
import { Attributes } from "../sr5/character";
import { CharacterType } from "../../../core/character";
import { WeaponModification } from "../weapon";
import { Jacket, Vest, Clothing, Security } from "./armor";

export class SR5_1_World extends World<SR5_1_Character> {
}

function createGoon(world: SR5_1_World, n: number, weapon: SR5_1_Weapon, armor: number): SR5_1_Character {
    const name = `Goon ${n}`;
    const attributes: Attributes = {
        Body: 4,
        Agility: 4,
        Reaction: 4,
        Strength: 4,
        Charisma: 3,
        Logic: 3,
        Intuition: 3,
        Willpower: 3
    };
    const initiativeBonus = 0;
    const initiativeDice = 1;
    const skills = new Map<string,number>();
    skills.set("Pistols", 3);
    skills.set("Automatics", 3);
    const weapons: SR5_1_Weapon[] = [
        weapon
    ];
    return new SR5_1_Character(
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

function createRunner(world: SR5_1_World, weapon: SR5_1_Weapon, armor: number): SR5_1_Character {
    const name = `Runner`;
    const attributes: Attributes = {
        Body: 5,
        Agility: 6,
        Reaction: 6,
        Strength: 6,
        Charisma: 4,
        Logic: 4,
        Intuition: 4,
        Willpower: 4
    };
    const initiativeBonus = 4;
    const initiativeDice = 3;
    const skills = new Map<string,number>();
    skills.set("Pistols", 5);
    skills.set("Automatics", 5);
    const weapons: SR5_1_Weapon[] = [
        { ...weapon, modifications: [WeaponModification.Smartlink] }
    ];
    return new SR5_1_Character(
        world,
        CharacterType.PC,
        name,
        attributes,
        initiativeBonus,
        initiativeDice,
        skills,
        weapons,
        armor,
    );
}

export function createSR5_1_StreetWorld(): SR5_1_World {
    const world = new SR5_1_World();

    const runner = createRunner(world, AresPredator, Vest);
    runner.move({ x: 0, y: 0, z: 0 });

    const goon1 = createGoon(world, 1, BrowningHighPower, Clothing);
    goon1.move({ x: 5, y: 0, z: 0 });

    const goon2 = createGoon(world, 2, BrowningHighPower, Clothing);
    goon2.move({ x: 20, y: 0, z: 0 });

    const goon3 = createGoon(world, 3, BrowningHighPower, Clothing);
    goon3.move({ x: 50, y: 0, z: 0 });

    return world;
}

export function createSR5_1_OrganizedCrimeWorld(): SR5_1_World {
    const world = new SR5_1_World();

    const runner = createRunner(world, HKMP9, Jacket);
    runner.move({ x: 0, y: 0, z: 0 });

    const goon1 = createGoon(world, 1, AresPredator, Vest);
    goon1.move({ x: 5, y: 0, z: 0 });

    const goon2 = createGoon(world, 2, AresPredator, Vest);
    goon2.move({ x: 20, y: 0, z: 0 });

    const goon3 = createGoon(world, 3, AresPredator, Vest);
    goon3.move({ x: 50, y: 0, z: 0 });

    return world;
}

export function createSR5_1_CorporateWorld(): SR5_1_World {
    const world = new SR5_1_World();

    const runner = createRunner(world, ColtM23, Security);
    runner.move({ x: 0, y: 0, z: 0 });

    const goon1 = createGoon(world, 1, HKMP9, Jacket);
    goon1.move({ x: 5, y: 0, z: 0 });

    const goon2 = createGoon(world, 2, HKMP9, Jacket);
    goon2.move({ x: 20, y: 0, z: 0 });

    const goon3 = createGoon(world, 3, HKMP9, Jacket);
    goon3.move({ x: 50, y: 0, z: 0 });

    return world;
}