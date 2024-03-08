import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../routes/routes'
import { UnauthorizedView } from './Unauthorized/UnauthorizedView'
import { AuthorizedView } from './Authorized/AuthorizedView'
import { PublicRegistrationView } from './Unauthorized/Registration/PublicRegistrationView'

export const RootView: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route path={routes.public.publicRegistration} component={PublicRegistrationView} />
            <Route
                path={routes.public.publicSelfRegistration}
                render={props => <PublicRegistrationView isSelf={true} {...props} />}
            />
            <Route path={routes.unauthorized.index} component={UnauthorizedView} />
            <Route path={routes.authorized.index} component={AuthorizedView} />
        </Switch>
    )
}
