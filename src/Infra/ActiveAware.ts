import { reaction, runInAction } from 'mobx';
import { Cleanup } from './Cleanup';

export interface ActiveAware {
    isActive: boolean;
}

export function handleActiveAware(viewModel: any): Cleanup | undefined {

    if (typeof viewModel !== 'object' || !('isActive' in (viewModel as object))) {
        return undefined;
    }

    const activeAware = viewModel as ActiveAware;

    runInAction(() => {
        activeAware.isActive = true;
    });

    return () => {
        runInAction(() => {
            activeAware.isActive = false;
        });
    };
}

export function handleActiveAwareWithCallback(activeAware: ActiveAware, onActivated?: () => void, onDeactivated?: () => void): Cleanup {
    if (onActivated === undefined && onDeactivated === undefined) {
        return () => { };
    }

    return reaction(() => activeAware.isActive, () => {
        if (activeAware.isActive) {
            runInAction(() => onActivated?.());
        }
        else {
            runInAction(() => onDeactivated?.());
        }
    }, { fireImmediately: false });
}
