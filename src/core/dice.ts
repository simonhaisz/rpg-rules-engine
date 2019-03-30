export class Die {
    readonly min: number
    readonly max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    roll(): number {
        // value [0,max)
        const randomness = Math.random() * this.max;
        // value [1,max]
        return Math.floor(randomness) + this.min;
    }
}

export const D4 = new Die(1, 4);
export const D6 = new Die(1, 6);
export const D8 = new Die(1, 8);
export const D10 = new Die(1, 10);
export const D12 = new Die(1, 12);
export const D20 = new Die(1, 20);

export function createDicePool(die: Die, count: number): Die[] {
    const dicePool: Die[] = [];
    dicePool.length = count;
    dicePool.fill(die);
    return dicePool;
}

export function rollDice(dice: Die[]): number[] {
    return dice.map(d => d.roll());
}