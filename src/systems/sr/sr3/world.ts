import { World } from "../../../core/world";
import { SR3_Character } from "./character";
import { CharacterType } from "../../../core/character";
import { WeaponModification } from "../weapon";
import { SR3_Weapon, AresPredator, BrowningHighPower, HK227, ColtM23 } from "./weapon";
import { Armor } from "./damage";
import { Jacket, Vest, Clothing, Security } from "./armor";

export class SR3_World extends World<SR3_Character> {
}

function createGoon(world: SR3_World, n: number, weapon: SR3_Weapon, armor: Armor): SR3_Character {
    const name = `Goon ${n}`;
    const attributes = { Body: 4, Quickness: 4, Strength: 4, Charisma: 3, Intelligence: 3, Willpower: 3 };
    const initiativeBonus = 0;
    const initiativeDice = 1;
    const skills = new Map<string,number>();
    skills.set("Pistols", 3);
    skills.set("SMGs", 3);
    skills.set("Assault Rifles", 3);
    const weapons: SR3_Weapon[] = [
        weapon
    ];
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

function createRunner(world: SR3_World, weapon: SR3_Weapon, armor: Armor): SR3_Character {
    const name = "Runner";
    const attributes = {
        Body: 5,
        Quickness: 6,
        Strength: 6,
        Charisma: 4,
        Intelligence: 4,
        Willpower: 4
    };
    const initiativeBonus = 4;
    const initiativeDice = 3;
    const skills = new Map<string,number>();
    skills.set("Pistols", 5);
    skills.set("SMGs", 5);
    skills.set("Assault Rifles", 5);
    const weapons: SR3_Weapon[] = [
        { ...weapon, modifications: [WeaponModification.Smartlink] }
    ];
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

export function createSR3_StreetWorld(): SR3_World {
    const world = new SR3_World();

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

export function createSR3_OrganizedCrimeWorld(): SR3_World {
    const world = new SR3_World();

    const runner = createRunner(world, HK227, Jacket);
    runner.move({ x: 0, y: 0, z: 0 });

    const goon1 = createGoon(world, 1, AresPredator, Vest);
    goon1.move({ x: 5, y: 0, z: 0 });

    const goon2 = createGoon(world, 2, AresPredator, Vest);
    goon2.move({ x: 20, y: 0, z: 0 });

    const goon3 = createGoon(world, 3, AresPredator, Vest);
    goon3.move({ x: 50, y: 0, z: 0 });

    return world;
}

export function createSR3_CorporateWorld(): SR3_World {
    const world = new SR3_World();

    const runner = createRunner(world, ColtM23, Security);
    runner.move({ x: 0, y: 0, z: 0 });

    const goon1 = createGoon(world, 1, HK227, Jacket);
    goon1.move({ x: 5, y: 0, z: 0 });

    const goon2 = createGoon(world, 2, HK227, Jacket);
    goon2.move({ x: 20, y: 0, z: 0 });

    const goon3 = createGoon(world, 3, HK227, Jacket);
    goon3.move({ x: 50, y: 0, z: 0 });

    return world;
}