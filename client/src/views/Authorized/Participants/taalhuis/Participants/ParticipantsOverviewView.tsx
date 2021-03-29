import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Button from '../../../../../components/Core/Button/Button'
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
import { useMockQuery } from '../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../routes/routes'
import { DateFormatters } from '../../../../../utils/formatters/Date/Date'
import { NameFormatters } from '../../../../../utils/formatters/name/Name'
import { ParticipantsMock, taalhuizenParticipantsMock } from '../../mocks/participants'
import { tabPaths, Tabs, tabTranslations } from '../constants'
import { ParticipantDetailLocationStateProps } from './Detail/ParticipantsDetailView'

interface Props {}

export const ParticipantsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery<ParticipantsMock[]>(taalhuizenParticipantsMock)
    const history = useHistory()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Deelnemers`)} />
            <Column spacing={10}>
                <Row justifyContent="flex-start">
                    <TabSwitch
                        defaultActiveTabId={Tabs.participants}
                        onChange={props => history.push(tabPaths[props.tabid as Tabs])}
                    >
                        <Tab label={tabTranslations[Tabs.participants]} tabid={Tabs.participants} />
                        <Tab label={tabTranslations[Tabs.registrations]} tabid={Tabs.registrations} />
                    </TabSwitch>
                </Row>
                <Row justifyContent="flex-end">
                    <Button
                        icon={IconType.add}
                        onClick={() => history.push(routes.authorized.participants.taalhuis.participants.create)}
                    >
                        {i18n._(t`Nieuwe deelnemer`)}
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
                    i18n._(t`Lopende Deeln.`),
                    i18n._(t`Afgeronde Deeln.`),
                    i18n._(t`Aangemaakt`),
                    i18n._(t`Bewerkt`),
                ]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }
        return data.map(participant => [
            <TableLink<ParticipantDetailLocationStateProps>
                to={{
                    pathname: routes.authorized.participants.taalhuis.participants.detail.index,
                    search: '',
                    hash: '',
                    state: {
                        participantId: participant.id,
                        // TODO: add name from real data
                        participantName: 'TEMP name',
                    },
                }}
                text={NameFormatters.formattedLastName({
                    familyName: participant.lastName,
                })}
            />,
            <p>{participant.nickName}</p>,
            <p>{participant.runningParticipants}</p>,
            <p>{participant.completedParticipants}</p>,
            <p>{DateFormatters.formattedDate(participant.createdAt)}</p>,
            <p>{DateFormatters.formattedDate(participant.editedAt)}</p>,
        ])
    }
}
