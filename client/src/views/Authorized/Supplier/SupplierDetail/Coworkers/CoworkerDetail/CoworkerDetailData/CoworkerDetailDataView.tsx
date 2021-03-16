import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../../components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from '../../../../../../../components/Core/HorizontalRule/HorizontalRule'
import Center from '../../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../../components/Core/Layout/Space/Space'
import Tab from '../../../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../../../../../components/Core/TabSwitch/types'
import AccountInformationFieldset from '../../../../../../../components/fieldsets/shared/AccountInformationFieldset'
import AvailabillityFieldset from '../../../../../../../components/fieldsets/shared/AvailabillityFieldset'
import InformationFieldset from '../../../../../../../components/fieldsets/shared/InformationFieldset'
import { useMockQuery } from '../../../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../../../routes/routes'
import { SupplierDetailCoworkersParams } from '../../../../../../../routes/supplier/types'
import { CoworkerDetailResponseMock, coworkerDetailMock } from '../../mocks/coworkers'

enum Tabs {
    data = 'data',
    documenten = 'documenten',
}

interface Props {}

const CoworkerDetailDataView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<SupplierDetailCoworkersParams>()

    const { loading, error, data } = useMockQuery<CoworkerDetailResponseMock, {}>(coworkerDetailMock, false)

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.documenten) {
            history.push(routes.authorized.supplier.read.coworkers.detail.documents.index(params))
        }
    }

    return (
        <>
            <Headline
                title={`${params.coworkername}`}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                        <Breadcrumb text={params.suppliername} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
                spacingType={SpacingType.small}
            />
            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch defaultActiveTabId={Tabs.data} onChange={handleTabSwitch}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                        <Tab label={i18n._(t`Documenten`)} tabid={Tabs.documenten} />
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
                <InformationFieldset
                    prefillData={{
                        lastname: data.lastname,
                        insertion: data.insertion,
                        callSign: data.callSign,
                        phonenumber: data.phonenumber,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <AvailabillityFieldset
                    prefillData={{
                        available: data.available,
                        note: data.note,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <AccountInformationFieldset
                    // roleOptions={[
                    //     [Roles.coordinator],
                    //     [Roles.mentor],
                    //     [Roles.coordinator, Roles.mentor],
                    //     [Roles.volunteer],
                    // ]}
                    prefillData={{
                        email: data.email,
                        role: data.role,
                    }}
                    readOnly={true}
                />
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.primary}
                                onClick={() =>
                                    history.push(routes.authorized.supplier.read.coworkers.detail.data.update(params))
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
}

export default CoworkerDetailDataView
