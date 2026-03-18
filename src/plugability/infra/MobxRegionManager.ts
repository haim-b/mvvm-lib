import { computed, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import { Region, RegionManager } from '../contracts';

@injectable()
export class MobxRegionManager implements RegionManager {
    private readonly regions = new Map<string, MobxRegion>();

    addToRegion(regionName: string, viewFactory: (context: any) => any, sortDescription?: string): void {
        const region = this.getRegion(regionName) as MobxRegion;

        region.viewFactoryInfos.push({ viewFactory, sortDescription: sortDescription ?? '' });
    }

    getRegion(regionName: string): Region {
        let region = this.regions.get(regionName);

        if (!region) {
            region = new MobxRegion();
            this.regions.set(regionName, region);
        }

        return region;
    }
}

interface ViewFactoryInfo {
    viewFactory: (context: any) => any;
    sortDescription: string;
}

export class MobxRegion implements Region {
    @observable readonly viewFactoryInfos: ViewFactoryInfo[] = [];

    constructor() {
        makeObservable(this);
    }

    @computed get viewFactories() {
        return orderBy(this.viewFactoryInfos, ['sortDescription'])
            .map((vfi) => vfi.viewFactory);
    }
}

function orderBy<T>(array: T[], iteratees: (keyof T)[]): T[] {
    return array.slice().sort((a, b) => {
        for (const iteratee of iteratees) {
            const aValue = a[iteratee];
            const bValue = b[iteratee];

            if (aValue < bValue) {
                return -1;
            } else if (aValue > bValue) {
                return 1;
            }
        }
        return 0;
    });
}