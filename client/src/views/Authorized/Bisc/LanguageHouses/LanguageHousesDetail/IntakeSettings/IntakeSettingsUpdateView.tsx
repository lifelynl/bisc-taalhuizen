import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import LanguageHousesDetailBreadcrumbs from 'components/Domain/Bisc/LanguageHouses/Breadcrumbs/LanguageHousesDetailBreadcrumbs'
import {
    IntakeSettingsFields,
    IntakeSettingsFieldsFormModel,
} from 'components/Domain/Bisc/LanguageHouses/IntakeSettingsFields'
import {
    LanguageHouseDetailTabs,
    LanguageHouseDetailTabsEnum,
} from 'components/Domain/Bisc/LanguageHouses/LanguageHouseDetailTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import {
    OrganizationIntakeFields,
    useEditOrganizationMutation,
    useOrganizationQuery,
} from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BiscLanguageHousesDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'

interface Props {}

export const IntakeSettingsUpdateView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<BiscLanguageHousesDetailRouteParams>()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    const { data, loading, error } = useOrganizationQuery({
        variables: {
            input: params.languageHouseId,
        },
    })

    const [editOrganization, editOrganizationMutation] = useEditOrganizationMutation({
        update(cache) {
            cache.evict({ fieldName: 'organization' })
        },
    })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    if (!data || error) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={data?.organization.name}
                TopComponent={<LanguageHousesDetailBreadcrumbs organizationSlug={organizationName} />}
                spacingType={SpacingType.small}
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <LanguageHouseDetailTabs activeTabId={LanguageHouseDetailTabsEnum.IntakeSettings} />
                </Row>
                <IntakeSettingsFields organization={data?.organization} />
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            disabled={loading}
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push(
                                    routes.authorized
                                        .bisc(organizationName)
                                        .languageHouses.detail(params.languageHouseId).intakeSettings.index
                                )
                            }
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={editOrganizationMutation.loading}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<IntakeSettingsFieldsFormModel>(e)

        const enabledIntakeFields = formData['enabledIntakeFields']
        const disabledIntakeFields = Object.values(OrganizationIntakeFields).filter(intakeField => {
            return !enabledIntakeFields || !enabledIntakeFields.includes(intakeField)
        })

        try {
            await editOrganization({
                variables: {
                    input: {
                        id: params.languageHouseId,
                        disabledIntakeFields,
                    },
                },
            })

            NotificationsManager.success(i18n._(t`Medewerker is bijgewerkt`))

            history.push(
                routes.authorized.bisc(organizationName).languageHouses.detail(params.languageHouseId).intakeSettings
                    .index
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
