import React, { useState } from 'react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import ProviderInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/ProviderInformationFieldset'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import LearningNeedsOfferInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/LearningNeedsOfferInformationFieldset'
import DetailsInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import { ParticipationPresenceFields } from '../../Participation/Fields/ParticipationPresenceFields'
import {
    Maybe,
    ParticipationFormality,
    ParticipationGroupType,
    ParticipationOfferType,
    ParticipationProviderOption,
    ParticipationQuery,
} from 'graphql/v2/generated/graphql'

interface Props {
    participation?: ParticipationQuery['participation']
    readOnly?: boolean
    showPresenceFields?: boolean
}

export interface LearningNeedsReferenceFormModel {
    // Provider fields
    provider?: Maybe<string>
    providerOption: ParticipationProviderOption
    providerOther?: Maybe<string>
    providerExplanation?: Maybe<string>

    // Participation fields (only visible on edit)
    startParticipation?: Maybe<string>

    // Extra participation fields
    offerName?: Maybe<string>
    offerType?: Maybe<ParticipationOfferType>
    formality?: Maybe<ParticipationFormality>
    groupFormation?: Maybe<ParticipationGroupType>
    degree?: Maybe<'false' | 'true'>
    start?: Maybe<string>
    end?: Maybe<string>
    agreement?: Maybe<string>
}

export const ParticipationFields: React.FC<Props> = props => {
    const { readOnly, participation } = props
    const { i18n } = useLingui()
    const [showCustomFields, setShowCustomFields] = useState(
        participation?.providerOption === ParticipationProviderOption.Other
    )

    return (
        <Column>
            <ProviderInformationFieldset
                readOnly={readOnly}
                onProviderChange={hasSelectedOther => setShowCustomFields(hasSelectedOther)}
                participation={participation}
            />
            {showCustomFields && renderCustomFields()}
        </Column>
    )

    function renderCustomFields() {
        const { showPresenceFields } = props

        return (
            <>
                {showPresenceFields && (
                    <>
                        <HorizontalRule />
                        <ParticipationPresenceFields readOnly={readOnly} defaultValues={participation} />
                    </>
                )}
                <HorizontalRule />
                <Column spacing={8}>
                    <div>
                        <SectionTitle title={'Aanvullende informatie deelname'} heading={'H3'} />
                        <Paragraph>{i18n._(t`Invullen indien bekend`)}</Paragraph>
                    </div>
                    <LearningNeedsOfferInformationFieldset readOnly={readOnly} defaultValues={participation} />
                    <HorizontalRule />
                    <DetailsInformationFieldset readOnly={readOnly} defaultValues={participation} />
                </Column>
            </>
        )
    }
}
