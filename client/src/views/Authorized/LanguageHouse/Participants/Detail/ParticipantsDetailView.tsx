import React, { useContext } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { ParticipantsIntakeView } from './Intake/ParticipantIntakeView'
import { ParticipantsUpdateIntakeView } from './Intake/ParticipantUpdateIntakeView'
import { ParticipantsLearningNeedsView } from './LearningNeeds/ParticipantsLearningNeedsView'
import { ParticipantsDocumentsOverviewView } from './ParticipantsDocumentsView'
import { ParticipantsDownloadDetailsView } from './ParticipantsDownloadDetailsView'
import { ParticipantsRegistrationView } from './ParticipantsRegistrationView'
import { ParticipantsContactMomentsView } from './ParticipantsContactMomentsView'
import { ParticipantMentorView } from './ParticipantMentorView/ParticipantMentorView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ParticipantsDetailView: React.FunctionComponent = () => {
    const sessionContext = useContext(SessionContext)
    const basePath = languageHouseRoutes().participants.detail()

    return (
        <Switch>
            <Redirect
                path={basePath.index}
                exact={true}
                to={languageHouseRoutes(sessionContext.organizationSlug).participants.detail().data.index}
            />
            <Route path={basePath.data.index} exact={true} component={ParticipantsIntakeView} />
            <Route path={basePath.data.update} exact={true} component={ParticipantsUpdateIntakeView} />
            <Route path={basePath.data.registration} exact={true} component={ParticipantsRegistrationView} />
            <Route path={basePath.data.dossier} exact={true} component={ParticipantsContactMomentsView} />
            <Route path={basePath.data.learningNeeds.index} component={ParticipantsLearningNeedsView} />
            <Route path={basePath.data.documents} exact={true} component={ParticipantsDocumentsOverviewView} />
            <Route path={basePath.data.downloadDetails} exact={true} component={ParticipantsDownloadDetailsView} />
            <Route path={basePath.data.mentor.index} component={ParticipantMentorView} />
        </Switch>
    )
}
