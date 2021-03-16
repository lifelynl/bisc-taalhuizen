import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import LabelTag from './LabelTag'
import { LabelColor, Roles } from './types'

interface Props {
    role: Roles | string
}

const RoleLabelTag: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { role } = props
    const colorConfig = {
        [Roles.coordinator]: LabelColor.red,
        [Roles.mentor]: LabelColor.purple,
        [Roles.volunteer]: LabelColor.yellow,
        [Roles.coworker]: LabelColor.blue,
    }
    const roleTranslations = {
        [Roles.coordinator]: i18n._(t`Coördinator`),
        [Roles.mentor]: i18n._(t`Begeleider`),
        [Roles.volunteer]: i18n._(t`Vrijwilliger`),
        [Roles.coworker]: i18n._(t`Medewerker`),
    }

    return (
        <LabelTag
            {...props}
            label={roleTranslations[role as Roles] || '[ROLE DOES NOT EXIST]'}
            color={colorConfig[role as Roles] || LabelColor.red}
        />
    )
}

export default RoleLabelTag
