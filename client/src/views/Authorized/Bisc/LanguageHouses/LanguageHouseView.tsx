import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'
import LanguageHouseCreateView from './LanguageHouseCreateView'
import { LanguageHouseOverviewView } from './LanguageHouseOverviewView'
import LanguageHousesDetailView from './LanguageHousesDetail/LanguageHousesDetailView'

interface Props {}

export const LanguageHouseView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route
                path={routes.authorized.bisc().languageHouses.index}
                exact={true}
                component={LanguageHouseOverviewView}
            />
            <Route
                path={routes.authorized.bisc().languageHouses.create}
                exact={true}
                component={LanguageHouseCreateView}
            />
            <Route path={routes.authorized.bisc().languageHouses.detail().index} component={LanguageHousesDetailView} />
        </Switch>
    )
}
