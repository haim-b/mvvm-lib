import { injectable, Newable } from 'inversify';
import React from 'react';
import { DataTemplatesRegistry } from './DataTemplatesRegistry';
import { PropsWithViewModel } from '../Infra';

@injectable()
export class DataTemplatesRegistryImpl implements DataTemplatesRegistry {
    private readonly registry: Map<
        Newable<unknown>, React.ComponentType<PropsWithViewModel>
    > = new Map();

    registerTemplate(
        viewModelType: Newable<unknown>,
        componentType: React.ComponentType<PropsWithViewModel>,
    ) {
        this.registry.set(viewModelType, componentType);
    }

    getComponentForViewModel<T = unknown>(
        viewModelType: Newable<T>,
    ): React.ComponentType<PropsWithViewModel> | undefined {
        
        // We climb up the class hierarchy until we find a registered view:
        let type = viewModelType;
        let component: React.ComponentType<PropsWithViewModel> | undefined;

        do {
            component = this.registry.get(type);
            type = Object.getPrototypeOf(type);
        } while (component === undefined && type !== null);

        return component;
    }
}
