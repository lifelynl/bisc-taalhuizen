import React, { useContext } from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { NotFoundView } from '../../../../Generic/NotFoundView'
import { LanguageHouseDetailDataView } from './Data/LanguageHouseDetailDataView'
import { routes } from 'routes/routes'
import { LanguageHouseDetailUpdateView } from './Data/LanguageHouseDetailUpdateView'
import { CoworkersView } from './Coworkers/CoworkersView'
import { BiscLanguageHousesDetailRouteParams } from 'routes/bisc/biscRoutes'
import { IntakeSettingsReadView } from './IntakeSettings/IntakeSettingsReadView'
import { IntakeSettingsUpdateView } from './IntakeSettings/IntakeSettingsUpdateView'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { LanguageHouseProvidersView } from './Providers/LanguageHouseProvidersView'
import { LanguageHouseProvidersEditView } from './Providers/LanguageHouseProvidersEditView'

interface Props extends RouteComponentProps<BiscLanguageHousesDetailRouteParams> {}

const LanguageHousesDetailView: React.FunctionComponent<Props> = props => {
    const sessionContext = useContext(SessionContext)
    const basePath = routes.authorized.bisc().languageHouses.detail()

    return (
        <Switch>
            <Redirect
                path={basePath.index}
                exact={true}
                to={routes.authorized.bisc(sessionContext.organizationSlug).languageHouses.detail().data.index}
            />
            <Route path={basePath.data.index} exact={true} component={LanguageHouseDetailDataView} />
            <Route path={basePath.data.update} exact={true} component={LanguageHouseDetailUpdateView} />
            <Route path={basePath.coworkers.index} component={CoworkersView} />
            <Route path={basePath.intakeSettings.index} exact={true} component={IntakeSettingsReadView} />
            <Route path={basePath.intakeSettings.update} exact={true} component={IntakeSettingsUpdateView} />
            <Route path={basePath.providers.view} exact={true} component={LanguageHouseProvidersView} />
            <Route path={basePath.providers.update} exact={true} component={LanguageHouseProvidersEditView} />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default LanguageHousesDetailView
