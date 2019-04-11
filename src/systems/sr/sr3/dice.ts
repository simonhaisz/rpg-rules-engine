import { createDicePool, D6, rollDice } from "../../../core/dice";

export function rollSuccesses(diceCount: number, targetNumber: number): number {
    const dicePool = createDicePool(D6, diceCount);
    const result = rollDice(dicePool);
    if (targetNumber <= 6) {
        return result.filter(r => r >= targetNumber).length;
    }
    return rollSuccesses(result.filter(r => r === 6).length, targetNumber - 6);
}