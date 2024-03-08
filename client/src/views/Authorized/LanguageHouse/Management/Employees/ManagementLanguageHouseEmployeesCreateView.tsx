import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { getMappedLanguageHouseCoworkerFormFields } from 'components/Domain/LanguageHouse/mappers/languageHouseFieldsMappers'
import LanguageHouseCoworkersInformationFieldset, {
    LanguageHouseCoworkersInformationFieldsetModel,
} from 'components/fieldsets/languageHouse/LanguageHouseCoworkersInformationFieldset'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useCreateEmployeeMutation } from 'graphql/v2/generated/graphql'

import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { Forms } from 'utils/forms'

interface Props {}

export const ManagementLanguageHouseEmployeesCreateView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const history = useHistory()
    const organizationId = sessionContext.user?.currentEmployee?.organization.id!

    const [createEmployeeMutation, { loading, error }] = useCreateEmployeeMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizationEmployees' })
        },
    })

    return (
        <Form onSubmit={handleCreate()}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.languageHouse(sessionContext.organizationSlug).management.overview,
                            breadcrumbItems.languageHouse(sessionContext.organizationSlug).management.employees,
                        ]}
                    />
                }
            />
            <MutationErrorProvider mutationError={error?.message}>
                <LanguageHouseCoworkersInformationFieldset showTeamSelectForOrganization={organizationId} />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push(
                                    languageHouseRoutes(sessionContext.organizationSlug).management.coworkers.index
                                )
                            }
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    function handleCreate() {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const formData = Forms.getFormDataFromFormEvent<LanguageHouseCoworkersInformationFieldsetModel>(e)
            const input = getMappedLanguageHouseCoworkerFormFields(formData, organizationId)

            try {
                const response = await createEmployeeMutation({
                    variables: {
                        createEmployeeInput: {
                            organization: organizationId,
                            employeeRole: input.role,
                            teams: input.teams,
                            person: {
                                familyName: input.person?.familyName,
                                additionalName: input.person?.additionalName,
                                givenName: input.person?.givenName,
                                email: input.person?.email,
                                telephone: input.person?.telephone,
                            },
                        },
                    },
                })

                NotificationsManager.success(
                    i18n._(t`Medewerker is aangemaakt`),
                    i18n._(t`Je wordt doorgestuurd naar de gegevens van de medewerker `)
                )

                if (input.person.email === sessionContext.user?.person?.email) {
                    sessionContext.refetch?.()
                }

                history.push(
                    languageHouseRoutes(sessionContext.organizationSlug).management.coworkers.detail(
                        response.data?.createEmployee.id
                    ).data.index
                )
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.data) {
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }
}
