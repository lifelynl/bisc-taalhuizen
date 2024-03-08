import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import { LanguageHouseParticipantDetailTabsEnum } from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantDetailTabs'
import { useStudentForMentorQuery } from 'graphql/v2/generated/graphql'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { ParticipantDetailHeader } from '../ParticipantDetailHeader'
import { ParticipantMentorDetailView } from './ParticipantMentorDetailView'
import { ParticipantMentorUpdateView } from './ParticipantMentorUpdateView'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useContext } from 'react'

export const ParticipantMentorView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { data, loading, error } = useStudentForMentorQuery({
        variables: {
            studentId: languageHouseParticipantId,
        },
    })

    return (
        <Column spacing={12}>
            <ParticipantDetailHeader activeTabId={LanguageHouseParticipantDetailTabsEnum.Mentor} />
            {renderPage()}
        </Column>
    )

    function renderPage() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={SpinnerAnimation.pageSpinner} />
                </Center>
            )
        }

        if (error || !data?.student) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        const basePath = languageHouseRoutes(organizationSlug).participants.detail().data.mentor

        return (
            <Switch>
                <Route path={basePath.detail} exact={true} component={ParticipantMentorDetailView} />
                <Route path={basePath.update} exact={true} component={ParticipantMentorUpdateView} />
                <Redirect path={basePath.index} to={basePath.detail} />
            </Switch>
        )
    }
}
