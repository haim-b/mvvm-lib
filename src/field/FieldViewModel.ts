import { action, computed, makeObservable, observable } from 'mobx';

type ValidateFn<T> = (value: T) => string | null;

export class FieldViewModel<T> {
    @observable accessor value: T | undefined;
    @observable accessor isTouched: boolean;

    constructor(
        readonly name: string,
        readonly title: string,
        readonly defaultValue?: T,
        private readonly validationFunc?: ValidateFn<T | undefined>,
        readonly dependsOn: FieldViewModel<unknown>[] = []
    ) {
        this.value = defaultValue;
        this.isTouched = false;
        this.title = title;
        makeObservable(this);
    }

    @computed get error(): string | null {
        if (this.validationFunc === undefined) {
            return null;
        }

        const dummyVarForMobxDependencyReaction = this.dependsOn?.map(field => field.value);

        return this.validationFunc(this.value);
    }

    @action.bound setValue(value: T | undefined) {
        this.value = value;
    }

    @action setTouched(isTouched: boolean) {
        this.isTouched = isTouched;
    }

    @computed get isValid() {
        return this.error === undefined || (this.error?.length ?? 0) === 0;
    }

}

export function validateByException(validation: () => void): string | null {
    try {
        validation();
        return null;
    } catch (error: any) {
        return error.message;
    }
}
