import { createDicePool, D6, rollDice } from "../../../core/dice";

export function SR5_rollHits(diceCount: number): number {
    if (diceCount <= 0) {
        return 0;
    }
    const dicePool = createDicePool(D6, diceCount);
    const result = rollDice(dicePool);
    return result.filter(r => r >= 5).length;
}