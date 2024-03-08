import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import {
    LanguageHouseParticipantDetailTabs,
    LanguageHouseParticipantDetailTabsEnum,
} from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantDetailTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useStudentForDetailHeaderQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { LanguageHouseParticipantsDetailRouteParams } from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    activeTabId: LanguageHouseParticipantDetailTabsEnum
    organisation?: string
}

export const ParticipantDetailHeader: React.FunctionComponent<Props> = ({ organisation, activeTabId }) => {
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()
    const { i18n } = useLingui()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { data, loading, error } = useStudentForDetailHeaderQuery({
        variables: {
            studentId: languageHouseParticipantId,
        },
    })

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

    return (
        <div>
            <Headline
                title={NameFormatters.formattedFullname(data?.student.person)}
                spacingType={SpacingType.small}
                subtitle={organisation}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[breadcrumbItems.languageHouse(organizationSlug).participants.overview]}
                    />
                }
            />
            <LanguageHouseParticipantDetailTabs activeTabId={activeTabId} />
        </div>
    )
}
