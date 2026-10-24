export type VariableType = 'text' | 'longtext' | 'boolean' | 'table';

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

export type TableMetaVariableDefinition = GenericVariableDefinition & {
	variables: VariableDefinition[];
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

export function isTableMetaVariable(
	variable: VariableDefinition
): variable is TableMetaVariableDefinition {
	return variable.type == 'table';
}

export function getDefaultVariableValue<T>(variable: VariableDefinition): T {
	if (isBooleanVariable(variable)) {
		return (variable.default_value ?? false) as T;
	} else if (isTextVariable(variable) || isLongTextVariable(variable)) {
		return (variable.default_value ?? '') as T;
	} else if (isTableMetaVariable(variable)) {
		return [] as T;
	}
	return undefined as T;
}
