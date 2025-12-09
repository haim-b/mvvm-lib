export interface RouteParams {
    [key: string]: string;
}

export interface RoutesManager {
    navigateTo(route: string, params?: RouteParams): void;
}

export const RoutesManager = Symbol.for('RoutesManager');
