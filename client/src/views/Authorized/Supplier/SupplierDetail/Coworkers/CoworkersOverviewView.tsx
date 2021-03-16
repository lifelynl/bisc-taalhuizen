import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button from '../../../../../components/Core/Button/Button'
import LabelTag from '../../../../../components/Core/DataDisplay/LabelTag/LabelTag'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import { Table } from '../../../../../components/Core/Table/Table'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../../../components/Core/TabSwitch/types'
import { useMockQuery } from '../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../routes/routes'
import { SupplierDetailParams } from '../../../../../routes/supplier/types'
import { coworkersMock, CoworkerMock } from './mocks/coworkers'

interface Props {}

enum Tabs {
    data = 'data',
    medewerkers = 'medewerkers',
}

export const CoworkersOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery<CoworkerMock[]>(coworkersMock)
    const history = useHistory()
    const params = useParams<SupplierDetailParams>()

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.data) {
            history.push(routes.authorized.supplier.read.data(params))
        }
    }

    return (
        <>
            <Headline
                title={i18n._(t`Aanbieder ${params.suppliername}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
                spacingType={SpacingType.small}
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch defaultActiveTabId={Tabs.medewerkers} onChange={handleTabSwitch}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.medewerkers} />
                    </TabSwitch>
                    <Button
                        icon={IconType.add}
                        onClick={() => history.push(routes.authorized.supplier.read.coworkers.create(params))}
                    >
                        {i18n._(t`Nieuwe medewerker`)}
                    </Button>
                </Row>
                {renderList()}
            </Column>
        </>
    )

    function renderList() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }
        return (
            <Table
                flex={1}
                headers={[
                    i18n._(t`ACHTERNAAM`),
                    i18n._(t`ROEPNAAM`),
                    i18n._(t`ROL`),
                    i18n._(t`AANGEMAAKT`),
                    i18n._(t`BEWERKT`),
                ]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }
        return data.map(item => {
            const createdAt = new Intl.DateTimeFormat('en-US').format(new Date(item.createdAt))
            const updatedAt = new Intl.DateTimeFormat('en-US').format(new Date(item.updatedAt))
            return [
                <Link
                    to={routes.authorized.supplier.read.coworkers.detail.index({
                        supplierid: params.supplierid,
                        suppliername: params.suppliername,
                        coworkername: `${item.callsign} ${item.lastname}`,
                        coworkerid: item.id.toString(),
                    })}
                >
                    {item.lastname}
                </Link>,
                <p>{item.callsign}</p>,
                <Row spacing={1}>
                    {item.roles.map(role => (
                        <LabelTag key={role} label={role} />
                    ))}
                </Row>,
                <p>{createdAt}</p>,
                <p>{updatedAt}</p>,
            ]
        })
    }
}
