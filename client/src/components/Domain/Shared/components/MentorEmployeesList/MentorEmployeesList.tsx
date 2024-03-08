import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { IconButton } from 'components/Core/Button/IconButton'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import Paragraph from 'components/Core/Typography/Paragraph'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { EmployeeType, OrganizationTypeEnum, PersonType } from 'graphql/v2/generated/graphql'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import Tooltip from 'components/Core/Feedback/Tooltip/Tooltip'

interface Props {
    employees: Array<EmployeeForSelection>
    showIconsColumns?: boolean
    onAddMentor: (data: EmployeeForSelection) => void
    onView: (data: EmployeeForSelection) => void
}

type EmployeeForSelection = Pick<EmployeeType, 'id' | 'role' | 'createdAt' | 'updatedAt'> & {
    person: Pick<PersonType, 'givenName' | 'familyName' | 'additionalName'>
}

export const MentorEmployeesList: React.FunctionComponent<Props> = props => {
    const { employees, showIconsColumns, onAddMentor, onView } = props
    const { i18n } = useLingui()

    return (
        <Table
            lastItemIsIcon={true}
            flex={1}
            headers={getHeader()}
            rows={getRows()}
            emptyMessage={i18n._(t`Er zijn nog geen begeleiders`)}
        />
    )

    function getHeader() {
        const defaultHeader = [
            { headerLabel: i18n._(t`ACHTERNAAM`), field: 'lastName' },
            { headerLabel: i18n._(t`ROEPNAAM`), field: 'firstName' },
            { headerLabel: i18n._(t`ROL`), field: 'role' },
            { headerLabel: i18n._(t`AANGEMAAKT`), field: 'createdAt' },
            { headerLabel: i18n._(t`BEWERKT`), field: 'updatedAt' },
        ]

        if (!showIconsColumns) {
            return defaultHeader
        }

        return [...defaultHeader, { headerLabel: '', field: 'icon' }]
    }

    function getRows() {
        if (!employees) {
            return []
        }

        return employees.map(employee => {
            const defaultItems = [
                <Paragraph bold={true}>{NameFormatters.formattedLastName(employee.person)}</Paragraph>,
                <Paragraph>{employee.person.givenName}</Paragraph>,
                <Row spacing={1}>
                    {employee.role && (
                        <RoleLabelTag role={employee.role} organizationType={OrganizationTypeEnum.Provider} />
                    )}
                </Row>,
                <Paragraph>{DateFormatters.formattedDate(employee.createdAt)}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(employee.updatedAt)}</Paragraph>,
            ]
            if (!showIconsColumns) {
                return defaultItems
            }

            return [
                ...defaultItems,

                <Row>
                    <Tooltip message={i18n._(t`Persoonsinformatie bekijken`)}>
                        <IconButton icon={IconType.openEye} onClick={() => handleOnViewClick(employee)} />
                    </Tooltip>
                    <Tooltip message={i18n._(t`Begeleider koppelen`)}>
                        <IconButton icon={IconType.addPerson} onClick={() => handleOnAddMentor(employee)} />
                    </Tooltip>
                </Row>,
            ]
        })
    }

    function handleOnViewClick(item: EmployeeForSelection) {
        onView(item)
    }

    function handleOnAddMentor(item: EmployeeForSelection) {
        onAddMentor(item)
    }
}
