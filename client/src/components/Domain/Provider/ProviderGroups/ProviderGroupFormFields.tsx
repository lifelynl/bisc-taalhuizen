import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { AvailabilityComparison, ComparisonInformation } from 'components/Core/Availability/AvailabilityComparison'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import {
    GeneralGroupInformationFieldset,
    GeneralGroupInformationFieldsetFormModel,
} from 'components/Domain/Groups/Fieldset/GeneralGroupInformationFieldset'
import { GroupDetailFieldset, GroupDetailFieldsetModel } from 'components/Domain/Groups/Fieldset/GroupDetailFieldset'
import { GroupFieldset, GroupFieldsetFormModel } from 'components/Domain/Groups/Fieldset/GroupFieldset'
import LearningOutcomeOfferFieldset, {
    LearningOutcomeOfferFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { AvailabilityFieldset, AvailabilityFieldsetModel } from 'components/fieldsets/shared/AvailabilityFieldset'
import { ProviderGroupFormFieldsFragmentFragment } from 'graphql/v2/generated/graphql'
import { Availability as AvailabilityEnum } from 'graphql/v2/generated/graphql'

interface Props {
    organizationId?: string
    readOnly?: boolean
    prefillData?: ProviderGroupFormFieldsFragmentFragment
    studentName?: string
    studentInformationForAvailabilityComparison?: ComparisonInformation
    hideAvailabilityFieldLabel?: boolean
    hasDarkerDivider?: boolean
}

export type ProviderGroupFormFieldsModel = GroupFieldsetFormModel &
    LearningOutcomeOfferFieldsetModel &
    GroupDetailFieldsetModel &
    AvailabilityFieldsetModel &
    GeneralGroupInformationFieldsetFormModel

export const ProviderGroupFormFields: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [groupName, setGroupName] = useState<string | null>(props.prefillData?.name ?? '')
    const [groupAvailability, setGroupAvailability] = useState<AvailabilityEnum[]>(
        props.prefillData?.availability ?? []
    )
    const [groupAvailabilityNotes, setGroupAvailabilityNotes] = useState<string | null>(
        props.prefillData?.availabilityNotes ?? ''
    )

    const { hasDarkerDivider } = props

    const groupInformationForAvailabilityComparison = {
        title: groupName || i18n._(t`Onbekend`),
        role: i18n._(t`Deelnamegroep`),
        availability: groupAvailability ?? [],
        availabilityNotes: groupAvailabilityNotes ?? '',
    }

    return (
        <Column spacing={4}>
            <GroupFieldset
                readOnly={props.readOnly}
                prefillData={props.prefillData}
                onInputName={newName => setGroupName(newName)}
            />
            <HorizontalRule dark={!!hasDarkerDivider} />
            <Section title={i18n._(t`Gewenste leeruitkomst`)}>
                <LearningOutcomeOfferFieldset
                    readOnly={props.readOnly}
                    allRequired={true}
                    defaultValues={props.prefillData?.desiredLearningNeedOutcome}
                />
            </Section>
            <HorizontalRule dark={!!hasDarkerDivider} />
            <GroupDetailFieldset readOnly={props.readOnly} prefillData={props.prefillData} />
            <HorizontalRule dark={!!hasDarkerDivider} />
            {props.readOnly && props.studentInformationForAvailabilityComparison && props.prefillData ? (
                <Section title={i18n._(t`Beschikbaarheid`)} useFullWidthContent={true}>
                    <AvailabilityComparison
                        leftHandComparisonInformation={groupInformationForAvailabilityComparison}
                        rightHandComparisonInformation={props.studentInformationForAvailabilityComparison}
                    />
                </Section>
            ) : (
                <AvailabilityFieldset
                    readOnly={props.readOnly}
                    hideAvailabilityFieldLabel={props.hideAvailabilityFieldLabel}
                    prefillData={props.prefillData}
                    onInputAvailability={newAvailability => setGroupAvailability(newAvailability)}
                    onInputAvailabilityNotes={newAvailabilityNotes => setGroupAvailabilityNotes(newAvailabilityNotes)}
                />
            )}
            <HorizontalRule dark={!!hasDarkerDivider} />
            <GeneralGroupInformationFieldset
                organizationId={props.organizationId}
                readOnly={props.readOnly}
                prefillData={props.prefillData}
                informationForAvailabilityComparison={groupInformationForAvailabilityComparison}
            />
        </Column>
    )
}
