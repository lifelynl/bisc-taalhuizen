import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Column from 'components/Core/Layout/Column/Column'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    ProviderParticipantDetailHeader,
    ProviderParticipantDetailTabsEnum,
} from 'components/Domain/Provider/ProviderParticipants/ProviderParticipantHeader'
import { ParticipationRegistrationReadFields } from 'components/Domain/Shared/Participation/ParticipationRegistrationReadFields'
import { StudentType, useStudentForRegistrationQuery } from 'graphql/v2/generated/graphql'
import React from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { ProviderParticipantDetailRouteParams } from 'routes/provider/providerRoutes'

interface Props extends RouteComponentProps<ProviderParticipantDetailRouteParams> {}

export const ParticipantRegistrationView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { providerParticipantId: studentId } = useParams<ProviderParticipantDetailRouteParams>()
    const { data, loading, error } = useStudentForRegistrationQuery({ variables: { studentId } })

    return (
        <Column spacing={12}>
            <ProviderParticipantDetailHeader activeTabId={ProviderParticipantDetailTabsEnum.registration} />
            <PageQuery data={data} loading={loading} error={error}>
                {({ student }) =>
                    !!student.registration.registeredPublicly ? (
                        <ParticipationRegistrationReadFields student={student as Partial<StudentType>} />
                    ) : (
                        <Paragraph subtle={true}>{i18n._(t`Geen digitale aanmelding`)}</Paragraph>
                    )
                }
            </PageQuery>
        </Column>
    )
}
