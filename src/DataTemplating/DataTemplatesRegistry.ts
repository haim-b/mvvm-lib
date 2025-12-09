import { Newable } from 'inversify';
import * as React from 'react';
import { PropsWithViewModel } from '../Infra';

export interface DataTemplatesRegistry {
    registerTemplate(viewModelType: Newable<unknown>, componentType: React.ComponentType<PropsWithViewModel>): void;

    getComponentForViewModel<T = unknown>(viewModelType: Newable<T>,): React.ComponentType<PropsWithViewModel> | undefined;
}

export const DataTemplatesRegistry = Symbol.for('ViewModelRegistry');
