import { info, debug } from "../../../log";
import { IGameMaster, GameResult, MAX_NUMBER_OF_ROUNDS } from "../../../core/gamemaster";
import { SR5_1_World } from "./world";
import { initiativeOrder } from "../initiative";
import { CharacterType } from "../../../core/character";

export class SR5_1_GameMaster implements IGameMaster {
    readonly world: SR5_1_World;
    private round = 0;
    private complete = false;
    private winner?: CharacterType;

    constructor(world: SR5_1_World) {
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
            debug(`Completed round ${this.round} with no victor`);
            if (this.round === MAX_NUMBER_OF_ROUNDS) {
                info(`Completed ${MAX_NUMBER_OF_ROUNDS} rounds with no victor - calling it a draw`);
                this._setWinner();
                return false;
            }
            return true;
        } else if (hasPC) {
            info(`PCs win combat on round ${this.round}`);
            this._setWinner(CharacterType.PC);
            return false;
        } else if (hasNPC) {
            info(`NPCs win combat on round ${this.round}`);
            this._setWinner(CharacterType.NPC);
            return false;
        } else {
            info(`Combat draw on round ${this.round}`);
            this._setWinner();
            return false;
        }
    }

    private _setWinner(winner?: CharacterType) {
        this.winner = winner;
        this.complete = true;
    }

    getResult(): GameResult {
        if (!this.complete) {
            throw new Error(`getResult() called before game is completed`);
        }
        return {
            winner: this.winner,
            numberOfRounds: this.round
        }
    }
}

export function createSR5_1_GameMaster(world: SR5_1_World) {
    return new SR5_1_GameMaster(world);
}