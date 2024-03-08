import Column from 'components/Core/Layout/Column/Column'
import {
    ParticipationFieldset,
    ParticipationFieldsetFormModel,
} from 'components/Domain/Groups/Fieldset/ParticipationFieldset'
import { ParticipationQuery } from 'graphql/v2/generated/graphql'

interface Props {
    readOnly?: boolean
    referringOrganizationName: string
    referredToOrganizationName: string
    prefillData?: ParticipationQuery['participation']
}

export type ParticipationEditFormFieldsModel = ParticipationFieldsetFormModel

export const ParticipationEditFields: React.FunctionComponent<Props> = props => {
    return (
        <Column spacing={4}>
            <ParticipationFieldset
                prefillData={props.prefillData}
                referringOrganizationName={props.referringOrganizationName}
                referredToOrganizationName={props.referredToOrganizationName}
            />
        </Column>
    )
}
