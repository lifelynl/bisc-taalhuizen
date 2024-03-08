import { TeamQuery } from 'graphql/v2/generated/graphql'
import { TeamDetailFormFields } from '../TeamDetailFields'

export function getMappedTeamFormFields(
    formData: TeamDetailFormFields,
    organizationId?: string,
    team?: TeamQuery['team']
): any {
    const conditionalFields: any = team
        ? {}
        : {
              type: 'team',
              parentOrganization: organizationId,
          }

    return {
        ...conditionalFields,
        name: formData.name ?? team?.name,
        team_postalCodes: formData.codes || [],
    }
}
