export interface RegionManager {
    addToRegion(regionName: string, viewFactory: ((context: any) => any), sortDescription?: string): void;
    getRegion(regionName: string): Region;
}

export const RegionManager = Symbol.for('RegionManager');

export interface Region {
    viewFactories: ((context: any) => any)[];
}
