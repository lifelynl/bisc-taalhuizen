import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { IconType } from 'components/Core/Icon/IconType'
import { ParticipationStatus } from 'graphql/v2/generated/graphql'
import React from 'react'

interface Props {
    status: ParticipationStatus
    className?: string
}

const ReferenceStatusLabel: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { status, className } = props
    const colorConfig = {
        [ParticipationStatus.Referred]: LabelColor.blue,
        [ParticipationStatus.AutoCreated]: LabelColor.blue,
        [ParticipationStatus.Ongoing]: LabelColor.red,
        [ParticipationStatus.Finished]: LabelColor.green,
    }
    const statusTranslations = {
        [ParticipationStatus.Referred]: i18n._(t`Verwezen`),
        [ParticipationStatus.AutoCreated]: i18n._(t`Nieuw`),
        [ParticipationStatus.Ongoing]: i18n._(t`Lopend`),
        [ParticipationStatus.Finished]: i18n._(t`Afgerond`),
    }
    const statusIcons = {
        [ParticipationStatus.Referred]: IconType.send,
        [ParticipationStatus.AutoCreated]: IconType.send,
        [ParticipationStatus.Ongoing]: IconType.rapportage,
        [ParticipationStatus.Finished]: IconType.checkmark,
    }

    return (
        <LabelTag
            {...props}
            className={className}
            icon={statusIcons[status]}
            label={statusTranslations[status] || i18n._(t`Status onbekend`)}
            color={colorConfig[status] || LabelColor.red}
        />
    )
}

export default ReferenceStatusLabel
