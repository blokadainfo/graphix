import { getGraphicVariables } from '../../../../server/main';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	return {
		variables: await getGraphicVariables(params.id),
		viewName: url.searchParams.get('view')
	};
};
