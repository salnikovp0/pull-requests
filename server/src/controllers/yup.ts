import {
    ArraySchemaConstructor,
    BooleanSchemaConstructor,
    DateSchemaConstructor,
    MixedSchemaConstructor,
    NumberSchemaConstructor,
    ObjectSchemaConstructor,
    StringSchemaConstructor,
} from 'yup'

export interface IYup {
    mixed: MixedSchemaConstructor
    string: StringSchemaConstructor
    number: NumberSchemaConstructor
    boolean: BooleanSchemaConstructor
    bool: BooleanSchemaConstructor
    date: DateSchemaConstructor
    array: ArraySchemaConstructor
    object: ObjectSchemaConstructor
}
