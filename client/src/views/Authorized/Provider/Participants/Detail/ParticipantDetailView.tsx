import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { ParticipantLearningNeedView } from './LearningNeed/ParticipantLearningNeedView'
import { ParticipantDocumentsView } from './ParticipantDocumentsView'
import { ParticipantEventsView } from './ParticipantEventsView'
import { ParticipantIntakeView } from './ParticipantIntakeView'
import { ParticipantLearningNeedsView } from './ParticipantLearningNeedsView'
import { ParticipantRegistrationView } from './ParticipantRegistrationView'
import { ParticipantsUpdateIntakeView } from './ParticipantsUpdateIntakeView'
import { ParticipantLearningNeedsCreateView } from './LearningNeed/ParticipantLearningNeedsCreateView'
import { ParticipantLearningNeedUpdateView } from './LearningNeed/ParticipantLearningNeedUpdateView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ParticipantDetailView: React.FunctionComponent = () => {
    const { organizationSlug } = useContext(SessionContext)
    const basePath = providerRoutes().participants.detail()
    return (
        <Switch>
            <Route path={basePath.data.index} exact={true} component={ParticipantIntakeView} />
            <Route path={basePath.data.registration} exact={true} component={ParticipantRegistrationView} />
            <Route path={basePath.data.dossier.index} exact={true} component={ParticipantEventsView} />
            <Route
                path={basePath.data.learningNeeds.create}
                exact={true}
                component={ParticipantLearningNeedsCreateView}
            />
            <Route
                path={basePath.data.learningNeeds.detail().update}
                exact={true}
                component={ParticipantLearningNeedUpdateView}
            />
            <Route path={basePath.data.learningNeeds.index} exact={true} component={ParticipantLearningNeedsView} />
            <Route path={basePath.data.learningNeeds.detail().index} component={ParticipantLearningNeedView} />
            <Route path={basePath.data.documents} exact={true} component={ParticipantDocumentsView} />
            <Route path={basePath.data.update} exact={true} component={ParticipantsUpdateIntakeView} />
            <Redirect path={basePath.index} to={providerRoutes(organizationSlug).participants.detail().data.index} />
        </Switch>
    )
}
