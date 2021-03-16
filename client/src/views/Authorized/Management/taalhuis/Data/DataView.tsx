import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../../../components/Core/TabSwitch/types'
import BranchInformationFieldset from '../../../../../components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset from '../../../../../components/fieldsets/shared/ContactInformationFieldset'
import { useMockQuery } from '../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../routes/routes'
import { ManagementDetailDataMock, managementDetailDataMockResponse } from '../Mock/managementDetailMock'

enum Tabs {
    data = 'data',
    medewerkers = 'medewerkers',
}

interface Props {}

const DataView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { loading, error, data } = useMockQuery<ManagementDetailDataMock, {}>(managementDetailDataMockResponse, false)

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.medewerkers) {
            history.push(routes.authorized.management.taalhuis.coworkers.index)
        }
    }

    return (
        <>
            <Headline title={i18n._(t`Beheer`)} spacingType={SpacingType.small} />
            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch defaultActiveTabId={Tabs.data} onChange={handleTabSwitch}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.medewerkers} />
                    </TabSwitch>
                </Row>
                {renderForm()}
            </Column>
        </>
    )

    function renderForm() {
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
            <>
                <BranchInformationFieldset
                    // prefillData={{
                    //     nameTaalhuis: data.nameTaalhuis,
                    //     street: data.street,
                    //     streetNo: data.streetNo,
                    //     postcode: data.postcode,
                    //     city: data.city,
                    // }}
                    readOnly={true}
                />
                <HorizontalRule />
                <ContactInformationFieldset
                    // prefillData={{
                    //     phoneNumberContactPerson: data.phoneNumberContactPerson,
                    //     contact: data.contact,
                    // }}
                    readOnly={true}
                />
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.primary}
                                onClick={() => history.push(routes.authorized.management.taalhuis.data.update)}
                            >
                                {i18n._(t`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }
}

export default DataView
