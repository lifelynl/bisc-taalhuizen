import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { ParticipantsLearningNeedsReferencesCreateView } from './ParticipantsLearningNeedsReferencesCreateView'
import { ParticipantsLearningNeedsReferencesUpdateView } from './ParticipantsLearningNeedsReferencesUpdateView'
import { ParticipantsLearningNeedsReferencesTestCreateView } from './Tests/ParticipantsLearningNeedsReferencesTestCreateView'
import { ParticipantsLearningNeedsReferencesTestUpdateView } from './Tests/ParticipantsLearningNeedsReferencesTestUpdateView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ParticipantsLearningNeedsReferencesView: React.FunctionComponent = () => {
    const sessionContext = useContext(SessionContext)
    const basePath = languageHouseRoutes().participants.detail().data.learningNeeds.detail().referrals

    return (
        <Switch>
            <Redirect
                path={basePath.index}
                exact={true}
                to={
                    languageHouseRoutes(sessionContext.organizationSlug)
                        .participants.detail()
                        .data.learningNeeds.detail().referrals.create
                }
            />

            <Route path={basePath.create} exact={true} component={ParticipantsLearningNeedsReferencesCreateView} />
            <Route
                path={basePath.detail().testResult.create}
                exact={true}
                component={ParticipantsLearningNeedsReferencesTestCreateView}
            />
            <Route
                path={basePath.detail().testResult.update()}
                exact={true}
                component={ParticipantsLearningNeedsReferencesTestUpdateView}
            />

            <Route
                path={basePath.detail().update}
                exact={true}
                component={ParticipantsLearningNeedsReferencesUpdateView}
            />
        </Switch>
    )
}
