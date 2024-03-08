import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import Row from 'components/Core/Layout/Row/Row'
import { EmployeeRole, OrganizationTypeEnum } from 'graphql/v2/generated/graphql'

import React from 'react'

interface Props {
    organizationType: OrganizationTypeEnum
    role: EmployeeRole
}

const RoleLabelTag: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    // combined roles? recursively call RoleLabelTag
    if (props.organizationType === OrganizationTypeEnum.Provider && props.role === EmployeeRole.CoordinatorMentor) {
        return (
            <Row wrap={true}>
                <RoleLabelTag organizationType={OrganizationTypeEnum.Provider} role={EmployeeRole.Coordinator} />
                <RoleLabelTag organizationType={OrganizationTypeEnum.Provider} role={EmployeeRole.Mentor} />
            </Row>
        )
    }

    return <LabelTag {...props} label={getTranslation()} color={getColor()} />

    function getColor() {
        if (props.organizationType === OrganizationTypeEnum.Bisc) {
            return LabelColor.red
        }

        if (props.organizationType === OrganizationTypeEnum.LanguageHouse) {
            const role = props.role as EmployeeRole.Coordinator | EmployeeRole.Employee

            return {
                [EmployeeRole.Coordinator]: LabelColor.red,
                [EmployeeRole.Employee]: LabelColor.blue,
            }[role]
        }

        if (props.organizationType === OrganizationTypeEnum.Provider) {
            const role = props.role as
                | EmployeeRole.Coordinator
                | EmployeeRole.Mentor
                | EmployeeRole.CoordinatorMentor
                | EmployeeRole.Volunteer

            return {
                [EmployeeRole.Coordinator]: LabelColor.red,
                [EmployeeRole.Mentor]: LabelColor.purple,
                [EmployeeRole.CoordinatorMentor]: LabelColor.red, // code doesnt reach this point
                [EmployeeRole.Volunteer]: LabelColor.yellow,
            }[role]
        }

        return LabelColor.red
    }

    function getTranslation() {
        if (props.organizationType === OrganizationTypeEnum.Bisc) {
            return '-'
        }

        if (props.organizationType === OrganizationTypeEnum.LanguageHouse) {
            const role = props.role as EmployeeRole.Coordinator | EmployeeRole.Employee

            return {
                [EmployeeRole.Coordinator]: i18n._(t`Coördinator`),
                [EmployeeRole.Employee]: i18n._(t`Medewerker`),
            }[role]
        }

        if (props.organizationType === OrganizationTypeEnum.Provider) {
            const role = props.role as
                | EmployeeRole.Coordinator
                | EmployeeRole.Mentor
                | EmployeeRole.CoordinatorMentor
                | EmployeeRole.Volunteer

            return {
                [EmployeeRole.Coordinator]: i18n._(t`Coördinator`),
                [EmployeeRole.Mentor]: i18n._(t`Begeleider`),
                [EmployeeRole.CoordinatorMentor]: '', // code doesnt reach this point
                [EmployeeRole.Volunteer]: i18n._(t`Vrijwilliger`),
            }[role]
        }

        return '-'
    }
}

export default RoleLabelTag
