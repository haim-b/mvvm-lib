export type EnumType = { [key: number]: string };
export type EnumPrototype<TEnum> = { [s: string]: TEnum };

/**
 * Represents a key for registering enums with data templates.
 */
export class EnumTemplateKey<TEnum extends EnumType> {
    readonly enumTypeId: string;

    constructor(enumType: EnumPrototype<TEnum>, readonly value: TEnum) {
        this.enumTypeId = createEnumTypeId<TEnum>(enumType);
    }

    /** Creates an enum template key for the specified enum type. */
    static for<TEnum extends EnumType>(enumType: EnumPrototype<TEnum>) {
        return { prototype: EnumTemplateKey, enumTypeId: createEnumTypeId(enumType) };
    }

    /** Checks if the specified template keys are for the same enums. */
    static areForTheSameEnum<TEnum extends EnumType>(first: EnumTemplateKey<TEnum>, second: EnumTemplateKey<TEnum>): boolean {
        return first.enumTypeId === second.enumTypeId;
    }
}

/** Creates a type identifier for the specified enum. This identifier is the backbone of the enum template key. */
export function createEnumTypeId<TEnum extends EnumType>(enumType: EnumPrototype<TEnum>): string {
    return Object.entries(enumType).flat().join('|');
}
