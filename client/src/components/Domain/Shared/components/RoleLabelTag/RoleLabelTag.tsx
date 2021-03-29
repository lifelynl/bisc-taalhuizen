import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { UserRoleEnum } from 'generated/graphql'

import React from 'react'

interface Props {
    role: UserRoleEnum | string
}

const RoleLabelTag: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { role } = props
    const colorConfig = {
        [UserRoleEnum.AanbiederCoordinator]: LabelColor.red,
        [UserRoleEnum.TaalhuisCoordinator]: LabelColor.red,
        [UserRoleEnum.AanbiederMentor]: LabelColor.purple,
        [UserRoleEnum.AanbiederVolunteer]: LabelColor.yellow,
        [UserRoleEnum.TaalhuisEmployee]: LabelColor.blue,
    }
    const roleTranslations = {
        [UserRoleEnum.AanbiederCoordinator]: i18n._(t`Coördinator`),
        [UserRoleEnum.TaalhuisCoordinator]: i18n._(t`Coördinator`),
        [UserRoleEnum.AanbiederMentor]: i18n._(t`Begeleider`),
        [UserRoleEnum.AanbiederVolunteer]: i18n._(t`Vrijwilliger`),
        [UserRoleEnum.TaalhuisEmployee]: i18n._(t`Medewerker`),
    }

    return (
        <LabelTag
            {...props}
            label={roleTranslations[role as UserRoleEnum] || '[ROLE DOES NOT EXIST]'}
            color={colorConfig[role as UserRoleEnum] || LabelColor.red}
        />
    )
}

export default RoleLabelTag
