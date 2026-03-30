import { Logger } from "logger-interface";

export interface AddOn {
    get name(): string;
    initialize<TServices extends { logger: Logger }>(configuration: object, services: TServices): Promise<void>;
}

export const AddOn = Symbol.for('AddOn');
