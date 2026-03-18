import { Container } from "inversify";
import { Logger } from "logger-interface";

export interface AddOn {
    get name(): string;
    initialize(iocContainer: Container, configuration: object, logger: Logger): Promise<void>;
}

export const AddOn = Symbol.for('AddOn');
