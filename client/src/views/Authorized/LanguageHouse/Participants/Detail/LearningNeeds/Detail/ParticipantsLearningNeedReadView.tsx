// import React, { useContext } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { LearningNeedFields } from 'components/Domain/LanguageHouse/Fields/LearningNeedFields'
import { useHistory, useParams } from 'react-router-dom'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import {
    LanguageHouseParticipantsDetailLearningNeedsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ParticipationReferenceCard } from 'components/Domain/Participation/Reference/ParticipationReferenceCard'
import { useLearningNeedQuery, useParticipationsQuery } from 'graphql/v2/generated/graphql'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import { useContext, useState } from 'react'
import { downloadFile } from 'utils/downloadFile'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ParticipantsLearningNeedReadView: React.FC = () => {
    const { languageHouseParticipantId, learningNeedId } =
        useParams<LanguageHouseParticipantsDetailLearningNeedsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const [loading, setLoading] = useState<boolean>()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const learningNeedQuery = useLearningNeedQuery({
        variables: {
            learningNeedId: learningNeedId,
        },
    })

    const participationsQuery = useParticipationsQuery({
        variables: {
            learningNeedId: learningNeedId,
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
        },
    })

    if (learningNeedQuery.loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    if (!learningNeedQuery.data?.learningNeed || learningNeedQuery.error) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    const participations = participationsQuery.data?.participations.nodes || []

    return (
        <Column spacing={4}>
            <Headline
                title={learningNeedQuery.data.learningNeed.description}
                subtitle={NameFormatters.formattedFullname(learningNeedQuery.data.learningNeed.student.person)}
                underTitle={learningNeedQuery.data.learningNeed.createdByOrganization.name}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.languageHouse(sessionContext.organizationSlug).participants.overview,
                            breadcrumbItems
                                .languageHouse(sessionContext.organizationSlug)
                                .participants.detail.learningNeeds.overview(languageHouseParticipantId),
                        ]}
                    />
                }
            />
            <Row justifyContent="flex-end">
                <Button
                    icon={IconType.send}
                    onClick={() =>
                        history.push(
                            languageHouseRoutes(organizationSlug)
                                .participants.detail(languageHouseParticipantId)
                                .data.learningNeeds.detail(learningNeedId).referrals.create
                        )
                    }
                >
                    {i18n._(t`Verwijzen naar`)}
                </Button>
            </Row>
            <>
                <LearningNeedFields readOnly={true} learningNeed={learningNeedQuery.data.learningNeed} />
                {participations.length > 0 && (
                    <>
                        <HorizontalRule />
                        <Column spacing={10}>
                            <SectionTitle title={i18n._(t`Activiteiten`)} heading={'H3'} />
                            <InfiniteScroll
                                hasMore={participationsQuery.data?.participations.hasMore ?? false}
                                loadMore={paginationArgs =>
                                    participationsQuery.fetchMore({ variables: { paginationArgs } })
                                }
                            >
                                <Column spacing={10}>
                                    {participationsQuery.data?.participations.nodes.map(
                                        participation =>
                                            learningNeedQuery.data?.learningNeed &&
                                            learningNeedQuery.data?.learningNeed!.student.organization.name! && (
                                                <ParticipationReferenceCard
                                                    key={participation.id}
                                                    participation={participation}
                                                    learningNeed={learningNeedQuery.data?.learningNeed}
                                                    languageHouseName={
                                                        learningNeedQuery.data?.learningNeed.student.organization.name
                                                    }
                                                />
                                            )
                                    )}
                                </Column>
                            </InfiniteScroll>
                        </Column>
                    </>
                )}
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <Button
                            icon={IconType.download}
                            type={ButtonType.quaternary}
                            loading={loading}
                            onClick={startDownload}
                        >
                            {i18n._(t`Gegevens downloaden`)}
                        </Button>
                    }
                    RightComponent={
                        <Button
                            type={ButtonType.primary}
                            onClick={() => {
                                history.push(
                                    languageHouseRoutes(organizationSlug)
                                        .participants.detail(languageHouseParticipantId)
                                        .data.learningNeeds.detail(learningNeedQuery.data?.learningNeed.id).update
                                )
                            }}
                        >
                            {i18n._(t`Leervraag bewerken`)}
                        </Button>
                    }
                />
            </>
        </Column>
    )

    async function startDownload() {
        setLoading(true)

        try {
            await downloadFile(
                '/exports/studentLearningNeedForExternalUse',
                { learningNeedId, studentId: languageHouseParticipantId },
                'student-learning-need.pdf',
                organizationSlug
            )

            NotificationsManager.success(i18n._(t`Rapportage wordt gedownload`))
        } catch (e) {
            NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            // eslint-disable-next-line no-console
            console.error(e)
        }

        setLoading(false)
    }
}
