import { IGameMaster } from "../../core/game-master";
import { World } from "./world";
import { initiativeOrder } from "./initiative";
import { CharacterType } from "../../core/character";

export class GameMaster implements IGameMaster {
    readonly world: World;
    private round = 0;

    constructor(world: World) {
        this.world = world;
    }

    newRound(): boolean {
        this.round++;
        const actingCharacters = this.world.characters.filter(c => c.canAct());
        actingCharacters.forEach(c => c.newRound());
        actingCharacters.sort((a, b) => initiativeOrder(a.getInitiative(), b.getInitiative()));
        for ( ; ; ) {
            actingCharacters.forEach(c => c.performAction());
            actingCharacters.forEach(c => c.newPhase());
            if (actingCharacters.filter(c => c.canAct() && c.getInitiative() > 0).length === 0) {
                break;
            }
        }
        this.world.characters.forEach(c => c.logState());
        const hasPC = actingCharacters.filter(c => c.canAct() && c.type === CharacterType.PC).length > 0;
        const hasNPC = actingCharacters.filter(c => c.canAct() && c.type === CharacterType.NPC).length > 0;
        if (hasPC && hasNPC) {
            console.log(`Completed round ${this.round} with no victor`);
            if (this.round > 10) {
                console.log(`Completed 10 rounds with no victor - calling it a draw`);
                return false;
            }
            return true;
        } else if (hasPC) {
            console.log(`PCs win combat on round ${this.round}`);
            return false;
        } else if (hasNPC) {
            console.log(`NPCs win combat on round ${this.round}`);
            return false;
        } else {
            console.log(`Combat draw on round ${this.round}`);
            return false;
        }
    }
}