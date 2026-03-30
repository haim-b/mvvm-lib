import { Logger } from "logger-interface";

export interface AddOn<TInitServices extends { logger: Logger }> {
    get name(): string;
    initialize<TInitServices>(configuration: object, services: TInitServices): Promise<void>;
}

export const AddOn = Symbol.for('AddOn');
