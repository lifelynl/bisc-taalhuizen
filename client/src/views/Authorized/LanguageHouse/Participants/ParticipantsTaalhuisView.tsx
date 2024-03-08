import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { ParticipantsOverviewView } from './ParticipantsOverviewView'
import { ParticipantsLanguageHouseCreateView } from './ParticipantsLanguageHouseCreateView'
import { ParticipantsDetailView } from './Detail/ParticipantsDetailView'
import { RegistrationsOverviewView } from './RegistrationsOverviewView'
import { RegistrationReadView } from './Detail/RegistrationReadView'

interface Props {}

export const ParticipantsTaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route path={languageHouseRoutes().participants.index} exact={true} component={ParticipantsOverviewView} />
            <Route
                path={languageHouseRoutes().participants.create}
                exact={true}
                component={ParticipantsLanguageHouseCreateView}
            />

            <Route
                path={languageHouseRoutes().participants.registrations.index}
                exact={true}
                component={RegistrationsOverviewView}
            />
            <Route
                path={languageHouseRoutes().participants.registrations.detail()}
                exact={true}
                component={RegistrationReadView}
            />

            <Route path={languageHouseRoutes().participants.detail().index} component={ParticipantsDetailView} />
        </Switch>
    )
}
