export type VariableType = 'text' | 'longtext' | 'boolean';

export type GenericVariableDefinition = {
	name: string;
	display_name?: string;
	type: VariableType;
};

export type BooleanVariableDefinition = GenericVariableDefinition & {
	default_value?: boolean;
};

export type TextVariableDefinition = GenericVariableDefinition & {
	placeholder?: string;
	default_value?: string;
	can_save_options?: boolean;
};

export type UnknownVariableDefinition = GenericVariableDefinition & {
	type: string;
};

export type VariableDefinition =
	BooleanVariableDefinition | TextVariableDefinition | UnknownVariableDefinition;

export function isTextVariable(variable: VariableDefinition): variable is TextVariableDefinition {
	return variable.type == 'text';
}

export function isLongTextVariable(
	variable: VariableDefinition
): variable is TextVariableDefinition {
	return variable.type == 'longtext';
}

export function isBooleanVariable(
	variable: VariableDefinition
): variable is BooleanVariableDefinition {
	return variable.type == 'boolean';
}

export type GraphicInfo = {
	name?: string;
	author?: string;
	variables?: VariableDefinition[];
	placeholder?: string;
};

export type UpdateGraphicMessage = {
	graphic: string;
	variable: string;
	value: unknown;
};

export type VariableUpdatedMessage = {
	variable: string;
	value: unknown;
};

export type VariableData = unknown;

export type GraphicVariables = {
	[name: string]: VariableData;
};

export type GraphicData = {
	variables: GraphicVariables;
};

export type Graphics = {
	[id: string]: GraphicData;
};
