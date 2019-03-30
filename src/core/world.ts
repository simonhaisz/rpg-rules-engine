import { ICharacter } from "./character";
import { Location } from "./location";

export const computeRange = (a: Location, b: Location): number => {
    if (a.z !== b.z) {
        // FIXME: for now assume a simple 2D combat environment AKA a single room
        return Number.NaN;
    }
    // DELTA-CUBES! DELTA-CUBES!
    const deltaSquare = (x1: number, x2: number): number => Math.pow(Math.abs(x1 - x2), 2);
    const h = Math.sqrt(deltaSquare(a.x, b.x) + deltaSquare(a.y, b.y));
    return h;
};

export interface IWorld {
    setup(): void;
}