import type { VariableDefinition } from './variables';

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

export type VariableData = never;

export type GraphicVariables = {
	[name: string]: VariableData;
};

export type GraphicData = {
	variables: GraphicVariables;
};

export type Graphics = {
	[id: string]: GraphicData;
};
