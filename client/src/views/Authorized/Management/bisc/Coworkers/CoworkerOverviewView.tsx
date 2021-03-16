import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Link from '../../../../../components/Core/Link/Link'
import { Table } from '../../../../../components/Core/Table/Table'
import { useMockQuery } from '../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../routes/routes'
import { medewerkersMock } from './Detail/coworkers'

interface Props {}

export interface FormModel {
    id: number
    achternaam: string
    tussenvoegsel: string
    roepnaam: string
    telefoonnummer: string
    email: string
    rol: string
    aangemaakt: string
    bewerkt: string
}

export const CoworkerOverviewView: React.FunctionComponent<Props> = () => {
    const { data, loading, error } = useMockQuery<FormModel[]>(medewerkersMock)
    const history = useHistory()

    return (
        <>
            <Headline title={i18n._(t`Beheer overview`)} spacingType={SpacingType.small} />

            <Column spacing={10}>
                <Row justifyContent="flex-end">
                    <Button
                        type={ButtonType.primary}
                        icon={IconType.add}
                        onClick={() => history.push(routes.authorized.management.bisc.coworkers.create)}
                    >
                        Nieuwe medewerker
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
                headers={[i18n._(t`achternaam`), i18n._(t`roepnaam`), i18n._(t`aangemaakt`), i18n._(t`bewerkt`)]}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }

        const list = data.map(coworker => {
            return [
                <Link
                    text={`${coworker.achternaam}, ${coworker.tussenvoegsel}`}
                    to={routes.authorized.management.bisc.coworkers.read({
                        coworkerid: coworker.id.toString(),
                        coworkername: coworker.roepnaam,
                    })}
                />,
                <p>{coworker.roepnaam}</p>,
                <p>{coworker.aangemaakt}</p>,
                <p>{coworker.bewerkt}</p>,
            ]
        })

        return list
    }
}
