import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { ParticipantsLearningNeedReadView } from './ParticipantsLearningNeedReadView'
import { ParticipantsLearningNeedUpdateView } from './ParticipantsLearningNeedUpdateView'

import { ParticipantsLearningNeedsReferencesView } from './References/ParticipantsLearningNeedsReferencesView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ParticipantsLearningNeedsDetailView: React.FunctionComponent = () => {
    const sessionContext = useContext(SessionContext)
    const basePath = languageHouseRoutes().participants.detail().data.learningNeeds

    return (
        <Switch>
            <Redirect
                path={basePath.index}
                exact={true}
                to={
                    languageHouseRoutes(sessionContext.organizationSlug)
                        .participants.detail()
                        .data.learningNeeds.detail().index
                }
            />
            <Route path={basePath.detail().index} exact={true} component={ParticipantsLearningNeedReadView} />
            <Route path={basePath.detail().update} exact={true} component={ParticipantsLearningNeedUpdateView} />
            <Route path={basePath.detail().referrals.index} component={ParticipantsLearningNeedsReferencesView} />
        </Switch>
    )
}
