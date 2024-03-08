import { OrganizationType } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import CoworkersDetailReadView from './CoworkersDetailReadView'
import CoworkersDetailUpdateView from './CoworkersDetailUpdateView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {
    organization: OrganizationType
}

export const CoworkersDetailView: React.FunctionComponent<Props> = props => {
    const { organization } = props
    const sessionContext = useContext(SessionContext)

    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc().languageHouses.detail().coworkers.detail().index}
                exact={true}
                to={
                    routes.authorized.bisc(sessionContext.organizationSlug).languageHouses.detail().coworkers.detail()
                        .data.index
                }
            />
            <Route path={routes.authorized.bisc().languageHouses.detail().coworkers.detail().data.index} exact={true}>
                <CoworkersDetailReadView organization={organization} />
            </Route>
            <Route path={routes.authorized.bisc().languageHouses.detail().coworkers.detail().data.update} exact={true}>
                <CoworkersDetailUpdateView organization={organization} />
            </Route>
            <Route component={NotFoundView} />
        </Switch>
    )
}
