export enum AimType {
    Snap = "Snap",
    Aimed = "Aimed",
    Precision = "Precision"
}

const RANGE_THRESHOLDS = [
    1, 2, 3, 4, 6, 8
];

const SNAP_RANGES = [
    2, 5, 10, 20, 50, 100
];

const AIMED_RANGES = [
    10, 20, 50, 100, 200, 500
];

const PRECISION_RANGES = [
    50, 100, 200, 500, 1000, 2000
];

export function getRangeThreshold(range: number, aim: AimType = AimType.Snap): number {
    let ranges: number[];
    switch (aim) {
        case AimType.Snap:
            ranges = SNAP_RANGES;
            break;
        case AimType.Aimed:
            ranges = AIMED_RANGES;
            break;
        case AimType.Precision:
            ranges = PRECISION_RANGES;
            break;
        default:
            throw new Error(`Unknown AimType '${aim}'`);
    }
    if (ranges.length !== RANGE_THRESHOLDS.length) {
        throw new Error(`'${aim}' ranges size of ${ranges.length} does not match the thresholds size of ${RANGE_THRESHOLDS.length}`);
    }
    for (let i = 0; i < ranges.length; i++) {
        if (range <= ranges[i]) {
            return RANGE_THRESHOLDS[i];
        }
    }
    throw new Error(`Range ${range} is outside the maximum range for '${aim}' shots`);
}