import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { OrganizationType, useOrganizationQuery } from 'graphql/v2/generated/graphql'
import React from 'react'
import { Route, Switch, useParams } from 'react-router-dom'
import { BiscLanguageHousesDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from '../../../../../../routes/routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import CoworkersCreateView from './CoworkersCreateView'
import CoworkersOverviewView from './CoworkersOverviewView'
import { CoworkersDetailView } from './detail/CoworkersDetailView'

interface Props {}

export const CoworkersView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = useParams<BiscLanguageHousesDetailRouteParams>()
    const { i18n } = useLingui()

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

    if (error || !data) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Switch>
            <Route path={routes.authorized.bisc().languageHouses.detail().coworkers.index} exact={true}>
                <CoworkersOverviewView />
            </Route>
            <Route path={routes.authorized.bisc().languageHouses.detail().coworkers.create} exact={true}>
                <CoworkersCreateView languageHouse={data?.organization} />
            </Route>

            <Route path={routes.authorized.bisc().languageHouses.detail().coworkers.detail().index}>
                <CoworkersDetailView organization={data?.organization as unknown as OrganizationType} />
            </Route>

            <Route component={NotFoundView} />
        </Switch>
    )
}
