import { rollTotal } from "./dice";

export function initiativeOrder(a: number, b: number): number {
    return resolveOrder(a, b);
}

function resolveTie(): number {
    const a = rollTotal(1);
    const b = rollTotal(1);
    return initiativeOrder(a, b);
}

function resolveOrder(a: number, b: number) {
    const delta = computeDelta(a, b);
    if (delta !== 0) {
        return delta;
    }
    return resolveTie();
}

function computeDelta(a: number, b: number): number {
    return b - a;
}