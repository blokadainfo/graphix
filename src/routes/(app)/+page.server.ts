import type { PageServerLoad } from './$types';
import { getGraphics } from '../../server/main.ts';

export const load: PageServerLoad = async () => {
	return {
		graphics: await getGraphics()
	};
};
