export type VariableType = 'text' | 'longtext' | 'boolean';

export type GenericVariableDefinition = {
    name: string;
    display_name?: string;
    type: VariableType;
}

export type BooleanVariableDefinition = GenericVariableDefinition & {
    default_value?: boolean;
}

export type TextVariableDefinition = GenericVariableDefinition & {
    placeholder?: string;
    default_value?: string;
}

export type UnknownVariableDefinition = GenericVariableDefinition & {
    type: string;
}

export type VariableDefinition = BooleanVariableDefinition | TextVariableDefinition | UnknownVariableDefinition;

export function isTextVariable(variable: VariableDefinition): variable is TextVariableDefinition {
    return variable.type == "text";
}

export function isLongTextVariable(variable: VariableDefinition): variable is TextVariableDefinition {
    return variable.type == "longtext";
}

export function isBooleanVariable(variable: VariableDefinition): variable is BooleanVariableDefinition {
    return variable.type == "boolean";
}

export type GraphicInfo = {
    name: string;
    author?: string;
    variables?: VariableDefinition[];
    placeholder?: string;
}