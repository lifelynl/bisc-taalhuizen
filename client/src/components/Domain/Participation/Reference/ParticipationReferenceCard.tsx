import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Paragraph from 'components/Core/Typography/Paragraph'
import DetailsInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import LearningNeedsOfferInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/LearningNeedsOfferInformationFieldset'
import ReferenceCardLinkedHeader from 'components/Participants/cards/ReferenceCard/Headers/ReferenceCardLinkedHeader'
import { OngoingStatus } from 'components/Participants/cards/ReferenceCard/Headers/Status/OngoingStatus'
import { ReferenceCard } from 'components/Participants/cards/ReferenceCard/ReferenceCard'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import {
    LearningNeedQuery,
    Maybe,
    OrganizationTypeEnum,
    ParticipationOutFlow,
    ParticipationProviderOption,
    ParticipationsQuery,
    ParticipationStatus,
} from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'
import { ProviderParticipantDetailLearningNeedsDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { ProviderGroupFormFields } from '../../Provider/ProviderGroups/ProviderGroupFormFields'
import {
    participationEndOptionsTranslations,
    participationOutflowTranslations,
} from '../../Groups/Translations/groupTranslations'
import { ProviderEmployeeFieldset } from '../../Shared/Fieldsets/ProviderEmployeeFieldset'
import { ParticipantsLearningNeedReferenceTestFields } from '../../Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import styles from './ParticipationReferenceCard.module.scss'
import {
    LanguageHouseParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'

interface Props {
    learningNeed: LearningNeedQuery['learningNeed']
    participation: ParticipationsQuery['participations']['nodes'][0]
    languageHouseName: string
}

export const ParticipationReferenceCard: React.FunctionComponent<Props> = props => {
    const { participation, learningNeed } = props
    const params = useParams<
        | ProviderParticipantDetailLearningNeedsDetailRouteParams
        | LanguageHouseParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams
    >()
    const participantId =
        'providerParticipantId' in params ? params.providerParticipantId : params.languageHouseParticipantId
    const learningNeedId = params.learningNeedId

    const history = useHistory()
    const { i18n } = useLingui()

    const contextUser = useContext(SessionContext).user
    const organizationSlug = useContext(SessionContext).organizationSlug
    const contextOrganization = contextUser?.currentEmployee?.organization

    const isOwnReference = participationProviderEqualsContextOrganization()
    const isEditable = participationIsEditable()

    const providerReferralPath = providerRoutes(organizationSlug)
        .participants.detail(participantId)
        .data.learningNeeds.detail(learningNeedId)
        .referrals.detail(participation.id)

    const languageHouseReferralPath = languageHouseRoutes(organizationSlug)
        .participants.detail(participantId)
        .data.learningNeeds.detail(learningNeedId)
        .referrals.detail(participation.id)

    return (
        <ReferenceCard
            showEditButton={isEditable}
            isReadOnly={!isEditable && !isOwnReference}
            onClickEditTopComponent={() => {
                if (contextOrganization?.type === OrganizationTypeEnum.LanguageHouse) {
                    history.push(languageHouseReferralPath.update)
                } else if (contextOrganization?.type === OrganizationTypeEnum.Provider) {
                    if (participation.educationGroup && providerReferralPath.groupAssignment?.update) {
                        history.push(providerReferralPath.groupAssignment?.update)
                    }
                    if (participation.mentor && providerReferralPath.mentorAssignment?.update) {
                        history.push(providerReferralPath.mentorAssignment?.update)
                    }
                }
            }}
            TopComponent={
                <ReferenceCardLinkedHeader
                    StatusComponent={renderStatusInfo()}
                    InformationComponent={renderTopInfo()}
                    MoreInformationComponent={renderMoreInfo()}
                />
            }
            BottomComponent={renderBottomComponent()}
            onClickEditBottomComponent={
                participation.testResult?.id
                    ? () =>
                          history.push(
                              (contextOrganization?.type === OrganizationTypeEnum.Provider
                                  ? providerReferralPath
                                  : languageHouseReferralPath
                              ).testResult.update(participation.testResult!.id)
                          )
                    : undefined
            }
        />
    )

    function renderBottomComponent() {
        if (!isOwnReference) {
            return
        }

        // own reference of provider
        if (contextUser?.accessGroup === OrganizationTypeEnum.Provider) {
            if (hasEducationGroupOrMentor()) {
                return renderTestInfo()
            }

            return renderLinkButtons()
        }

        // own reference of language house
        if (contextUser?.accessGroup === OrganizationTypeEnum.LanguageHouse) {
            return renderTestInfo()
        }
    }

    function renderStatusInfo() {
        if (!participation.providerOption) {
            return <></>
        }

        return (
            <OngoingStatus
                title={participation.offerName!}
                providerName={participation.provider?.name || participation.providerOther || ''}
                languageHouseName={props.languageHouseName}
                providerOption={participation.providerOption}
                status={participation.status}
                isOwnReference={isOwnReference}
                hasEducationGroup={!!participation.educationGroup}
                hasMentor={!!participation.mentor}
            />
        )
    }

    function renderTopInfo() {
        const createdAtLabel =
            participation.status === ParticipationStatus.AutoCreated
                ? i18n._('Aangemaakt op')
                : i18n._('Verwijzing aangemaakt op')

        return (
            <Column spacing={6}>
                <Column>
                    <Field label={createdAtLabel} horizontal={true}>
                        <Paragraph>{renderActivityDate(participation.createdAt)}</Paragraph>
                    </Field>
                    {participation.providerExplanation && (
                        <Field label={i18n._('Toelichting op verwijzing')} horizontal={true}>
                            <Paragraph>{participation.providerExplanation}</Paragraph>
                        </Field>
                    )}
                    <Field label={i18n._('Startdatum activiteit')} horizontal={true}>
                        <Paragraph>{renderActivityDate(participation.start)}</Paragraph>
                    </Field>
                    <Field label={i18n._('Einddatum activiteit')} horizontal={true}>
                        <Paragraph>{renderActivityDate(participation.end)}</Paragraph>
                    </Field>
                </Column>
                <Column>
                    <Field label={renderStartDateLabel()} horizontal={true}>
                        <Paragraph>
                            {participation.startParticipation &&
                                DateFormatters.formattedDate(participation.startParticipation)}
                        </Paragraph>
                    </Field>
                    {participation.endParticipation && (
                        <Field label={renderEndDateLabel()} horizontal={true}>
                            <Paragraph>{DateFormatters.formattedDate(participation.endParticipation)}</Paragraph>
                        </Field>
                    )}
                    {participation.reasonEndParticipation && (
                        <Field label={i18n._('Reden gestopt')} horizontal={true}>
                            <Paragraph>
                                {participationEndOptionsTranslations[participation.reasonEndParticipation]}
                            </Paragraph>
                        </Field>
                    )}
                    {participation.outFlowParticipation && (
                        <Field label={i18n._('Uitstroom')} horizontal={true}>
                            <Paragraph>
                                {participationOutflowTranslations[participation.outFlowParticipation]}
                            </Paragraph>
                            {participation.outFlowParticipation === ParticipationOutFlow.Other && (
                                <Paragraph italic={true}>{participation.outFlowReasonOther}</Paragraph>
                            )}
                        </Field>
                    )}
                </Column>
            </Column>
        )
    }

    function renderActivityDate(date?: Maybe<string>) {
        if (participation.mentor) {
            // when activity type is mentor, there is no concept of start/end of the activity
            return i18n._('n.v.t.')
        }

        if (!date) {
            return '-'
        }

        return DateFormatters.formattedDate(date)
    }

    function renderStartDateLabel() {
        if (participation.start && new Date(participation.start) > new Date()) {
            return i18n._('Deelnemer begint per')
        }

        return i18n._('Deelnemer begonnen per')
    }

    function renderEndDateLabel() {
        if (participation.end && new Date(participation.end) > new Date()) {
            return i18n._('Deelnemer stopt per')
        }

        return i18n._('Deelnemer gestopt per')
    }

    function renderMoreInfo() {
        if (participation.providerOption === ParticipationProviderOption.Other) {
            return (
                <Column spacing={6}>
                    <LearningNeedsOfferInformationFieldset defaultValues={participation} readOnly={true} />
                    <HorizontalRule dark={true} />
                    <DetailsInformationFieldset
                        defaultValues={participation}
                        readOnly={true}
                        fieldControls={{ end: { hidden: true }, start: { hidden: true } }}
                    />
                </Column>
            )
        }

        if (participation.providerOption === ParticipationProviderOption.Provider) {
            if (participation.educationGroup) {
                return (
                    <ProviderGroupFormFields
                        prefillData={participation.educationGroup}
                        readOnly={true}
                        hideAvailabilityFieldLabel={true}
                        hasDarkerDivider={true}
                    />
                )
            }

            if (participation.mentor) {
                return (
                    <ProviderEmployeeFieldset
                        prefillData={participation.mentor}
                        readOnly={true}
                        hasDarkerDivider={true}
                    />
                )
            }
        }
    }

    function renderLinkButtons() {
        if (
            contextOrganization?.type !== OrganizationTypeEnum.Provider ||
            !providerReferralPath.groupAssignment?.select
        ) {
            return
        }

        return (
            <Section title={i18n._('Koppelen')} className={styles.addNewSection}>
                <Field>
                    <Row>
                        <Button
                            type={ButtonType.tertiary}
                            icon={IconType.addGroup}
                            onClick={() => history.push(providerReferralPath.groupAssignment!.select)}
                        >
                            {i18n._('Toevoegen aan deelnamegroep')}
                        </Button>
                        <Button
                            type={ButtonType.tertiary}
                            icon={IconType.addGroup}
                            onClick={() => history.push(providerReferralPath.mentorAssignment!.select)}
                        >
                            {i18n._('Koppelen aan begeleider')}
                        </Button>
                    </Row>
                </Field>
            </Section>
        )
    }

    function renderTestInfo() {
        if (!participation.testResult && isOwnReference) {
            const testResultPath =
                contextOrganization?.type === OrganizationTypeEnum.Provider
                    ? providerReferralPath.testResult.create
                    : languageHouseReferralPath.testResult.create

            return (
                <Section title={i18n._('Resultaat')} className={styles.addNewSection}>
                    <Field>
                        <Column>
                            <Button type={ButtonType.tertiary} onClick={() => history.push(testResultPath)}>
                                {i18n._('Activiteit afronden')}
                            </Button>
                        </Column>
                    </Field>
                </Section>
            )
        }

        if (!participation.testResult) {
            return undefined
        }

        return <ParticipantsLearningNeedReferenceTestFields participation={participation} readOnly={true} />
    }

    function participationProviderEqualsContextOrganization() {
        if (!contextOrganization) {
            return false
        }

        if (participation.providerOption === ParticipationProviderOption.Provider) {
            return participation.provider?.id === contextOrganization.id
        }

        if (participation.providerOption === ParticipationProviderOption.Other) {
            /**
             * This case means that the participation is provided
             * by the student's language house organization
             */
            return learningNeed.student.organization.id === contextOrganization.id
        }

        return false
    }

    function participationIsEditable() {
        if (contextUser?.accessGroup === OrganizationTypeEnum.LanguageHouse) {
            if (participation.providerOption === ParticipationProviderOption.Provider) {
                if (participation.status === ParticipationStatus.Referred) {
                    return true
                }
            }

            if (participation.providerOption === ParticipationProviderOption.Other) {
                return participation.status !== ParticipationStatus.AutoCreated
            }
        }

        if (contextUser?.accessGroup === OrganizationTypeEnum.Provider) {
            return isOwnReference && hasEducationGroupOrMentor()
        }

        return false
    }

    function hasEducationGroupOrMentor() {
        return !!(participation.educationGroup || participation.mentor)
    }
}
