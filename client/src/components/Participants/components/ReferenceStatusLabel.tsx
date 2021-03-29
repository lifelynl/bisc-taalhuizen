import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { IconType } from 'components/Core/Icon/IconType'
import React from 'react'

interface Props {
    status: ReferenceStatusLabelStatus | string
    className?: string
}

export enum ReferenceStatusLabelStatus {
    Refered = 'REFERED',
    Ongoing = 'ONGOING',
    Finished = 'FINISHED',
}

const ReferenceStatusLabel: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { status, className } = props
    const colorConfig = {
        [ReferenceStatusLabelStatus.Refered]: LabelColor.blue,
        [ReferenceStatusLabelStatus.Ongoing]: LabelColor.red,
        [ReferenceStatusLabelStatus.Finished]: LabelColor.green,
    }
    const statusTranslations = {
        [ReferenceStatusLabelStatus.Refered]: i18n._(t`Verwezen`),
        [ReferenceStatusLabelStatus.Ongoing]: i18n._(t`Lopend`),
        [ReferenceStatusLabelStatus.Finished]: i18n._(t`Afgerond`),
    }
    const statusIcons = {
        [ReferenceStatusLabelStatus.Refered]: IconType.send,
        [ReferenceStatusLabelStatus.Ongoing]: IconType.rapportage,
        [ReferenceStatusLabelStatus.Finished]: IconType.checkmark,
    }

    return (
        <LabelTag
            {...props}
            className={className}
            icon={statusIcons[status as ReferenceStatusLabelStatus]}
            label={statusTranslations[status as ReferenceStatusLabelStatus] || '[STATUS DOES NOT EXIST]'}
            color={colorConfig[status as ReferenceStatusLabelStatus] || LabelColor.red}
        />
    )
}

export default ReferenceStatusLabel
