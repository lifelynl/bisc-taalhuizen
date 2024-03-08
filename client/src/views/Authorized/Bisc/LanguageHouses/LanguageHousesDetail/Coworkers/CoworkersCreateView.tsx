import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import LanguageHouseCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/LanguageHouses/Breadcrumbs/LanguageHouseCoworkersDetailBreadcrumbs'
import { getMappedLanguageHouseCoworkerFormFields } from 'components/Domain/LanguageHouse/mappers/languageHouseFieldsMappers'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import LanguageHouseCoworkersInformationFieldset, {
    LanguageHouseCoworkersInformationFieldsetModel,
} from 'components/fieldsets/languageHouse/LanguageHouseCoworkersInformationFieldset'
import { OrganizationType, useCreateEmployeeMutation } from 'graphql/v2/generated/graphql'

import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { biscRoutes, BiscLanguageHousesDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'

interface Props {
    languageHouse: Pick<OrganizationType, 'name'>
}

const CoworkersCreateView: React.FunctionComponent<Props> = props => {
    const { languageHouse } = props
    const { languageHouseId } = useParams<BiscLanguageHousesDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

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
                    <LanguageHouseCoworkersDetailBreadcrumbs
                        languageHouseId={languageHouseId}
                        languageHouseName={languageHouse.name}
                        organizationSlug={organizationName}
                    />
                }
            />
            <MutationErrorProvider mutationError={error?.message}>
                <LanguageHouseCoworkersInformationFieldset showTeamSelectForOrganization={languageHouseId} />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push(
                                    routes.authorized.bisc(organizationName).languageHouses.detail(languageHouseId)
                                        .coworkers.index
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
            const input = getMappedLanguageHouseCoworkerFormFields(formData, languageHouseId)

            try {
                const response = await createEmployeeMutation({
                    variables: {
                        createEmployeeInput: {
                            person: {
                                familyName: input.person?.familyName,
                                additionalName: input.person?.additionalName,
                                givenName: input.person?.givenName,
                                email: input.person?.email,
                                telephone: input.person?.telephone,
                            },
                            organization: languageHouseId,
                            employeeRole: input.role,
                            teams: input.teams,
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
                    biscRoutes(organizationName)
                        .languageHouses.detail(languageHouseId)
                        .coworkers.detail(response.data?.createEmployee.id).index
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

export default CoworkersCreateView
