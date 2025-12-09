import { ServiceIdentifier } from 'inversify';
import * as React from 'react';
import { PropsWithViewModel } from '../infra';

export interface DataTemplatesRegistry {
    registerTemplate(viewModelType: ServiceIdentifier<unknown>, componentType: React.ComponentType<PropsWithViewModel>): void;

    getComponentForViewModel<T = unknown>(viewModelType: ServiceIdentifier<T>,): React.ComponentType<PropsWithViewModel> | undefined;
}

export const DataTemplatesRegistry = Symbol.for('ViewModelRegistry');
