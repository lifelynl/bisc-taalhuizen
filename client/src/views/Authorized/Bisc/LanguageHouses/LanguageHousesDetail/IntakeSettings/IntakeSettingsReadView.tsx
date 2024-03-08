import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import LanguageHousesDetailBreadcrumbs from 'components/Domain/Bisc/LanguageHouses/Breadcrumbs/LanguageHousesDetailBreadcrumbs'
import { IntakeSettingsFields } from 'components/Domain/Bisc/LanguageHouses/IntakeSettingsFields'
import {
    LanguageHouseDetailTabs,
    LanguageHouseDetailTabsEnum,
} from 'components/Domain/Bisc/LanguageHouses/LanguageHouseDetailTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useOrganizationQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BiscLanguageHousesDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'

interface Props {}

export const IntakeSettingsReadView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { languageHouseId } = useParams<BiscLanguageHousesDetailRouteParams>()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    const { data, loading, error } = useOrganizationQuery({
        variables: {
            input: languageHouseId,
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
        <>
            <Headline
                title={data?.organization.name}
                TopComponent={<LanguageHousesDetailBreadcrumbs organizationSlug={organizationName} />}
                spacingType={SpacingType.small}
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <LanguageHouseDetailTabs activeTabId={LanguageHouseDetailTabsEnum.IntakeSettings} />
                </Row>
                <IntakeSettingsFields organization={data?.organization} readOnly={true} />
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.primary}
                            onClick={() =>
                                history.push(
                                    routes.authorized.bisc(organizationName).languageHouses.detail(languageHouseId)
                                        .intakeSettings.update
                                )
                            }
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </>
    )
}
