import { CharacterType } from "../../../core/character";
import { Location } from "../../../core/location";
import { SR5_World } from "./world";
import { DamageTrack, SR_Character, Skills } from "../character";
import { rollTotal } from "../dice";
import { SR5_Weapon } from "./weapon";
import { computeRange } from "../../../core/world";
import { debug } from "../../../log";

export type Attributes = {
    Body: number;
    Agility: number;
    Reaction: number;
    Strength: number;
    Charisma: number;
    Logic: number;
    Intuition: number;
    Willpower: number;
}

export class SR5_Character extends SR_Character {
    readonly world: SR5_World;
    readonly attributes: Attributes;
    readonly initiativeBonus: number;
    readonly initiativeDice: number;
    readonly weapons: SR5_Weapon[];
    readonly armor: number;

    constructor(
        world: SR5_World,
        type: CharacterType,
        name: string,
        attributes: Attributes,
        initiativeBonus: number,
        initiativeDice: number,
        skills: Skills,
        weapons: SR5_Weapon[],
        armor: number
    ) {
        super(type, name, skills);
        this.world = world;
        this.attributes = attributes;
        this.initiativeBonus = initiativeBonus;
        this.initiativeDice = initiativeDice;
        this.weapons = weapons;
        this.armor = armor;
        world.addCharacter(this);
    }

    newRound(): void {
        if (!this.canAct()) {
            return;
        }
        this.initiative = 
            this.attributes.Reaction +
            this.attributes.Intuition +
            this.initiativeBonus +
            rollTotal(this.initiativeDice);
    }

    newPhase() {
        if (!this.canAct()) {
            return;
        }
        if (this.initiative > 0) {
            this.initiative -= 10;
        }
    }

    performAction(): void {
        if (this.weapons.length === 0) {
            return;
        }
        const nearestOpponent = this.findNearestOpponent();
        if (nearestOpponent === null) {
            debug(`No opponents left, doing nothingg`);
            return;
        }
        throw new Error("Method not implemented.");
    }

    getSkill(weapon: SR5_Weapon): number {
        let skill: number;
        
    }

    findNearestOpponent(): SR5_Character | null {
        const opponentType = this.type === CharacterType.PC ? CharacterType.NPC : CharacterType.PC;
        const opponents = this.world.characters.filter(c => c.canAct() && c.type === opponentType);
        if (opponents.length === 0) {
            return null;
        } 
        opponents.sort((a, b) =>
            computeRange(this.getLocation(), a.getLocation()) - computeRange(this.getLocation(), b.getLocation())
        );
        return opponents[0];
    }
}