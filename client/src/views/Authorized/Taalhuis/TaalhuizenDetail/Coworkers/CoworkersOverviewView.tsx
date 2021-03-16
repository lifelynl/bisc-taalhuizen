import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../components/Chrome/Headline'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button from '../../../../../components/Core/Button/Button'
import RoleLabelTag from '../../../../../components/Core/DataDisplay/LabelTag/RoleLabelTag'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import { Table } from '../../../../../components/Core/Table/Table'
import { TableLink } from '../../../../../components/Core/Table/TableLink'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../../../components/Core/TabSwitch/types'
import { useTaalhuisEmployeesQuery } from '../../../../../generated/graphql'
import { routes } from '../../../../../routes/routes'
import { TaalhuisDetailParams } from '../../../../../routes/taalhuis/types'

interface Props {}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

const CoworkersOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const params = useParams<TaalhuisDetailParams>()
    const decodedTaalhuisId = decodeURIComponent(params.taalhuisid)
    const { data, loading, error } = useTaalhuisEmployeesQuery({
        variables: {
            taalhuisId: decodedTaalhuisId,
        },
    })
    const history = useHistory()
    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.gegevens) {
            history.push(routes.authorized.taalhuis.read.data(params))
        }
    }

    return (
        <>
            <Headline
                title={i18n._(t`Medewerkers`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                        <Breadcrumb text={params.taalhuisname} to={routes.authorized.taalhuis.read.data(params)} />
                        <Breadcrumb
                            text={i18n._(t`Medewerkers`)}
                            to={routes.authorized.taalhuis.read.coworkers.overview(params)}
                        />
                    </Breadcrumbs>
                }
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch onChange={handleTabSwitch} defaultActiveTabId={TabId.coworkers}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={TabId.gegevens} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={TabId.coworkers} />
                    </TabSwitch>

                    <Button
                        icon={IconType.add}
                        onClick={() => history.push(routes.authorized.taalhuis.read.coworkers.create(params))}
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
                    i18n._(t`achternaam`),
                    i18n._(t`roepnaam`),
                    i18n._(t`rol`),
                    i18n._(t`aangemaakt`),
                    i18n._(t`bewerkt`),
                ]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }

        const list = data.taalhuisEmployees.map(coworker => {
            const createdAt = new Intl.DateTimeFormat('en-US').format(new Date(coworker.dateCreated))
            const updatedAt = new Intl.DateTimeFormat('en-US').format(new Date(coworker.dateModified))

            return [
                <TableLink
                    text={`${coworker.additionalName}, ${coworker.familyName}`}
                    to={routes.authorized.taalhuis.read.coworkers.detail.data({
                        taalhuisid: params.taalhuisid,
                        taalhuisname: params.taalhuisname,
                        coworkerid: coworker.id,
                    })}
                />,
                <p>{coworker.givenName}</p>,
                <Row spacing={1}>
                    {coworker.userRoles.map(role => (
                        <RoleLabelTag role={role.name} />
                    ))}
                </Row>,
                <p>{createdAt}</p>,
                <p>{updatedAt}</p>,
            ]
        })

        return list
    }
}
export default CoworkersOverviewView
