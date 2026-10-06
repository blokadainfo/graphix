import { get_graphic_variables } from "../../../../server/main"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
    return {
        variables: await get_graphic_variables(params.id)
    }
}