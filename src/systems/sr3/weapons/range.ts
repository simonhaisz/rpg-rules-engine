export type RangeBracket = {
    Short: number;
    Medium: number;
    Long: number;
    Extreme: number;
};

export const getTN = (range: number, bracket: RangeBracket): number => {
    if (range < 0) {
        throw new Error(`Range cannot be negative`);
    }
    if (!bracket) {
        throw new Error(`Bracket must be defined`);
    }
    if (range <= bracket.Short) {
        return 4;
    }
    if (range <= bracket.Medium) {
        return 5;
    }
    if (range <= bracket.Long) {
        return 6;
    }
    if (range <= bracket.Extreme) {
        return 9;
    }
    // possible for target to be out of range - needs to be handled by system
    return Number.NaN;
};