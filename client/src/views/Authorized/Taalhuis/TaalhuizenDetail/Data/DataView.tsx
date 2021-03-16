import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../../../components/Core/TabSwitch/types'
import TaalhuisInformationFieldset from '../../../../../components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import { useTaalhuisQuery } from '../../../../../generated/graphql'
import { routes } from '../../../../../routes/routes'
import { TaalhuisDetailParams } from '../../../../../routes/taalhuis/types'

interface Props {}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

const DataView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { taalhuisid, taalhuisname } = useParams<TaalhuisDetailParams>()
    const { data, loading, error } = useTaalhuisQuery({
        variables: { taalhuisId: decodeURIComponent(taalhuisid || '') },
    })

    if (!taalhuisid) {
        return null
    }

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.coworkers) {
            history.push(routes.authorized.taalhuis.read.coworkers.overview({ taalhuisid, taalhuisname }))
        }
    }

    return (
        <>
            <Headline
                title={i18n._(t`${taalhuisname}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
                spacingType={SpacingType.small}
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch onChange={handleTabSwitch} defaultActiveTabId={TabId.gegevens}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={TabId.gegevens} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={TabId.coworkers} />
                    </TabSwitch>
                </Row>
                {renderViews()}
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.primary}
                            onClick={() =>
                                history.push(routes.authorized.taalhuis.read.update({ taalhuisid, taalhuisname }))
                            }
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </>
    )

    function renderViews() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }
        return (
            <TaalhuisInformationFieldset
                readOnly={true}
                prefillData={{
                    taalhuis: data.taalhuis.name,
                    street: data.taalhuis.address?.street,
                    streetNr: data.taalhuis.address?.houseNumber,
                    addition: data.taalhuis.address?.houseNumberSuffix,
                    postalCode: data.taalhuis.address?.postalCode,
                    city: data.taalhuis.address?.locality,
                    phoneNumber: data.taalhuis.telephone || undefined,
                    email: data.taalhuis.email || undefined,
                }}
            />
        )
    }
}

export default DataView
