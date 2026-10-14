import { getGraphicVariables } from '../../../../server/main';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		variables: await getGraphicVariables(params.id)
	};
};
