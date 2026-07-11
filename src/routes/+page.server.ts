import type { PageServerLoad } from './$types';
import { get_graphics } from '../server/main.ts';

export const load: PageServerLoad = async () => {
	return {
		graphics: await get_graphics()
	};
};
