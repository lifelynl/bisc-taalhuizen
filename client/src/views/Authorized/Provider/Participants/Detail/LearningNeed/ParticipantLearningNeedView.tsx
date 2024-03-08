import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { ParticipantLearningNeedDetailView } from './ParticipantLearningNeedDetailView'
import { ParticipantLearningNeedReferralGroupAssignmentSelectView } from './Referral/GroupAssignment/ParticipantLearningNeedReferralGroupAssignmentSelectView'
import { ParticipantLearningNeedReferralGroupAssignmentUpdateView } from './Referral/GroupAssignment/ParticipantLearningNeedReferralGroupAssignmentUpdateView'
import { ReferralGroupAssignmentPreviewView } from './Referral/GroupAssignment/ReferralGroupAssignmentPreviewView'
import { ParticipantLearningNeedReferralMentorAssignmentSelectView } from './Referral/MentorAssignment/ParticipantLearningNeedReferralMentorAssignmentSelectView'
import { ParticipantLearningNeedReferralMentorAssignmentUpdateView } from './Referral/MentorAssignment/ParticipantLearningNeedReferralMentorAssignmentUpdateView'
import { ReferralMentorAssignmentPreviewView } from './Referral/MentorAssignment/ReferralMentorAssignmentPreviewView'
import { ParticipationResultCreateView } from './Referral/Result/ParticipationResultCreateView'
import { ParticipationResultUpdateView } from './Referral/Result/ParticipationResultUpdateView'

export const ParticipantLearningNeedView: React.FunctionComponent = () => {
    const basePath = providerRoutes().participants.detail().data.learningNeeds.detail()

    return (
        <Switch>
            <Route
                path={basePath.referrals.detail().groupAssignment.select}
                exact={true}
                component={ParticipantLearningNeedReferralGroupAssignmentSelectView}
            />
            <Route
                path={basePath.referrals.detail().groupAssignment.preview()}
                exact={true}
                component={ReferralGroupAssignmentPreviewView}
            />
            <Route
                path={basePath.referrals.detail().groupAssignment.update}
                exact={true}
                component={ParticipantLearningNeedReferralGroupAssignmentUpdateView}
            />
            <Route
                path={basePath.referrals.detail().mentorAssignment.select}
                exact={true}
                component={ParticipantLearningNeedReferralMentorAssignmentSelectView}
            />
            <Route
                path={basePath.referrals.detail().mentorAssignment.preview()}
                exact={true}
                component={ReferralMentorAssignmentPreviewView}
            />
            <Route
                path={basePath.referrals.detail().mentorAssignment.update}
                exact={true}
                component={ParticipantLearningNeedReferralMentorAssignmentUpdateView}
            />
            <Route
                path={basePath.referrals.detail().testResult.create}
                exact={true}
                component={ParticipationResultCreateView}
            />
            <Route
                path={basePath.referrals.detail().testResult.update()}
                exact={true}
                component={ParticipationResultUpdateView}
            />
            <Route path={basePath.index} exact={true} component={ParticipantLearningNeedDetailView} />
        </Switch>
    )
}
