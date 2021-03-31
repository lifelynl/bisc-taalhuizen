import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { IconType } from 'components/Core/Icon/IconType'
import React from 'react'
import LabelTag from '../../Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from '../../Core/DataDisplay/LabelTag/types'

export enum StatusTypes {
    active = 'active',
    completed = 'completed',
    referred = 'referred',
}

interface Props {
    label: StatusTypes
}

export const StatusLabelTag: React.FC<Props> = ({ label }) => {
    const { i18n } = useLingui()

    const statusTypesTranslations = {
        [StatusTypes.active]: i18n._(t`Lopend`),
        [StatusTypes.completed]: i18n._(t`Afgerond`),
        [StatusTypes.referred]: i18n._(t`Verwezen`),
    }
    return <LabelTag label={statusTypesTranslations[label]} icon={getIcon()} color={getColor()} />

    function getIcon() {
        let icon
        switch (label) {
            case (label = StatusTypes.completed):
                icon = IconType.checkmark
                break
            case (label = StatusTypes.active):
                icon = IconType.stripe
                break
            case (label = StatusTypes.referred):
                icon = IconType.send
                break
        }

        return icon
    }

    function getColor() {
        let color
        switch (label) {
            case (label = StatusTypes.completed):
                color = LabelColor.green
                break
            case (label = StatusTypes.active):
                color = LabelColor.red
                break
            case (label = StatusTypes.referred):
                color = LabelColor.blue
                break
        }

        return color
    }
}
