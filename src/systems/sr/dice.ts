import { createDicePool, D6, rollDice } from "../../core/dice";

export function rollTotal(diceCount: number): number {
    const dicePool = createDicePool(D6, diceCount);
    return rollDice(dicePool).reduce((a, b) => a + b, 0);
}