import { injectable, ServiceIdentifier } from 'inversify';
import React from 'react';
import { DataTemplatesRegistry } from './DataTemplatesRegistry';
import { PropsWithViewModel } from '../infra';

@injectable()
export class DataTemplatesRegistryImpl implements DataTemplatesRegistry {
    private readonly registry: Map<
        ServiceIdentifier<unknown>, React.ComponentType<PropsWithViewModel>
    > = new Map();

    registerTemplate(
        viewModelType: ServiceIdentifier<unknown>,
        componentType: React.ComponentType<PropsWithViewModel>,
    ) {
        this.registry.set(viewModelType, componentType);
    }

    getComponentForViewModel<T = unknown>(
        viewModelType: ServiceIdentifier<T>,
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
