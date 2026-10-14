import type { GraphicData, Graphics } from '$lib/shared/types';

export type Data = {
	version: number;
	graphics: Graphics;
};

export const defaultGraphicData: GraphicData = {
	variables: {}
};

export const defaultData: Data = {
	version: 1,
	graphics: {}
};
