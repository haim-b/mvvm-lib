import { Container, inject, injectable, multiInject, optional } from 'inversify';
import { AddOn } from '../contracts/AddOn';
import { Logger } from 'logger-interface';

@injectable()
export class AddOnsLoader {
    constructor(
        @multiInject(AddOn) @optional() private readonly addOns: AddOn[],
        @inject(Logger) private readonly logger: Logger) { }

    async loadAddOns(container: Container, addOnsConfig: { [addOnName: string]: { enabled: boolean } }): Promise<void> {
        if (!addOnsConfig) {
            return;
        }

        await Promise.all(this.addOns.map(async (addOn) => {
            const addOnConfig = addOnsConfig[addOn.name];

            if (addOnsConfig[addOn.name]?.enabled !== true) {
                this.logger.info(`Add-on '${addOn.name}' ${addOnConfig ? 'is not registered' : 'is disabled'}.`);
                return;
            }

            try {
                await addOn.initialize(container, addOnConfig, this.logger);
            } catch (error) {
                this.logger.error(`Failed to initialize the add-on '${addOn.name}'.\nError: ${error}`);
            }
        }));
    }
}
