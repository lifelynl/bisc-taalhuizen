import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { StudentType } from 'graphql/v2/generated/graphql'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    className?: string
    students: StudentType[]
    itemTo: (student: StudentType) => string
}

export const ParticipantsTable: React.FC<Props> = ({ students, itemTo }) => {
    const { i18n } = useLingui()

    return (
        <Table
            flex={[0.25, 0.25]}
            headers={[
                { headerLabel: i18n._(`Achternaam`), field: 'familyName' },
                { headerLabel: i18n._(`Roepnaam`), field: 'givenName' },
            ]}
            rows={getRows(students)}
            emptyMessage={i18n._(t`Er zijn nog geen deelnemers`)}
        />
    )

    function getRows(students: StudentType[]) {
        return students.map(student => {
            return [
                <TableLink
                    text={(student.person && NameFormatters.formattedLastName(student.person)) || '-'}
                    to={itemTo(student)}
                />,
                <Paragraph>{student.person?.givenName}</Paragraph>,
            ]
        })
    }
}
