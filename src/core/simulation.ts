import { IWorld } from "./world";
import { IGameMaster, GameResult } from "./game-master";
import { CharacterType } from "./character";
import { debug } from "../log";

type WinStats = {
    count: number;
    probability: number;
    minRounds: number;
    maxRounds: number;
    averageRounds: number;
    medianRounds: number;
}
export function runSimulation<TWorld extends IWorld, TGameMaster extends IGameMaster>(
    iterations: number,
    worldCreator: () => TWorld,
    gmCreator: (world: TWorld) => TGameMaster
    ): Map<CharacterType | undefined, WinStats> {
    const allResults: GameResult[] = []
    for (let i=0; i<iterations; i++) {
        const world = worldCreator();
        const gm = gmCreator(world);
        for ( ; ; ) {
            if (!gm.newRound()) {
                break;
            }
        }
        allResults.push(gm.getResult());
    }
    debug(JSON.stringify(allResults));
    const simulationResults = new Map<CharacterType | undefined, WinStats>();
    const winnerTypes = [CharacterType.PC, CharacterType.NPC, undefined];
    winnerTypes.forEach(type => {
        const filtedResults = allResults.filter(r => r.winner === type).map(r => r.numberOfRounds);
        if (filtedResults.length === 0) {
            simulationResults.set(type, {
                count: 0,
                probability: 0,
                minRounds: 0,
                maxRounds: 0,
                averageRounds: 0,
                medianRounds: 0
            });
            return;
        }
        
        const count = filtedResults.length;

        const probability = count / allResults.length;
        
        let minRounds = Number.MAX_SAFE_INTEGER;
        filtedResults.forEach(r => minRounds = Math.min(minRounds, r));
        
        let maxRounds = 0;
        filtedResults.forEach(r => maxRounds = Math.max(maxRounds, r));
        
        const total = filtedResults.reduce((a, b) => a + b);
        const averageRounds = total / count;

        let medianRounds;
        filtedResults.sort((a, b) => a - b);
        if (filtedResults.length % 2 === 0) {
            const middle = count / 2;
            medianRounds = (filtedResults[middle] + filtedResults[middle+1]) / 2;
        } else {
            const middle = Math.ceil(count / 2);
            medianRounds = filtedResults[middle];
        }
        simulationResults.set(type, {
            count,
            probability,
            minRounds,
            maxRounds,
            averageRounds,
            medianRounds
        });
    });
    return simulationResults;
}