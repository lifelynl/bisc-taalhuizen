import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import {
    ProviderParticipantDetailHeader,
    ProviderParticipantDetailTabsEnum,
} from 'components/Domain/Provider/ProviderParticipants/ProviderParticipantHeader'
import { ParticipantIntakeFields } from 'components/Domain/Participation/Fields/ParticipantIntakeFields'
import { useStudentForIntakeQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom'
import { ProviderParticipantDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props extends RouteComponentProps<ProviderParticipantDetailRouteParams> {}

export const ParticipantIntakeView: React.FunctionComponent<Props> = props => {
    const canEditIntake = useContext(SessionContext).permissions?.canEditIntake()
    const organizationId = useContext(SessionContext).user?.currentEmployee?.organization.id!
    const organizationSlug = useContext(SessionContext).organizationSlug

    const { providerParticipantId: studentId } = useParams<ProviderParticipantDetailRouteParams>()
    const { data, loading, error } = useStudentForIntakeQuery({ variables: { studentId } })
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        <Column spacing={12}>
            <ProviderParticipantDetailHeader
                activeTabId={ProviderParticipantDetailTabsEnum.intake}
                organisation={data?.student.organization.name}
            />
            <PageQuery data={data} loading={loading} error={error}>
                {({ student }) => (
                    <>
                        <ParticipantIntakeFields
                            student={student}
                            readOnly={true}
                            isProvider={data?.student.organization.id === organizationId}
                            disabledIntakeFields={student.organization.disabledIntakeFields}
                        />
                        {canEditIntake && (
                            <Actionbar
                                RightComponent={
                                    <Button
                                        type={ButtonType.primary}
                                        onClick={() =>
                                            history.push(
                                                providerRoutes(organizationSlug).participants.detail(student.id).data
                                                    .update
                                            )
                                        }
                                    >
                                        {i18n._(t`Bewerken`)}
                                    </Button>
                                }
                            />
                        )}
                    </>
                )}
            </PageQuery>
        </Column>
    )
}
