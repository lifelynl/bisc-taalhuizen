import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { ParticipantsLearningNeedsOverviewView } from './ParticipantLearningNeedsOverviewView'
import { ParticipantsLearningNeedsCreateView } from './ParticipantsLearningNeedsCreateView'
import { ParticipantsLearningNeedsDetailView } from './Detail/ParticipantsLearningNeedsDetailView'
import { ParticipantsLearningNeedsCreateWithReferralView } from './ParticipantsLearningNeedsCreateWithReferralView'

export const ParticipantsLearningNeedsView: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route
                path={languageHouseRoutes().participants.detail().data.learningNeeds.index}
                exact={true}
                component={ParticipantsLearningNeedsOverviewView}
            />
            <Route
                path={languageHouseRoutes().participants.detail().data.learningNeeds.create}
                exact={true}
                component={ParticipantsLearningNeedsCreateView}
            />
            <Route
                path={languageHouseRoutes().participants.detail().data.learningNeeds.createReferral}
                exact={true}
                component={ParticipantsLearningNeedsCreateWithReferralView}
            />
            <Route
                path={languageHouseRoutes().participants.detail().data.learningNeeds.detail().index}
                component={ParticipantsLearningNeedsDetailView}
            />
        </Switch>
    )
}
