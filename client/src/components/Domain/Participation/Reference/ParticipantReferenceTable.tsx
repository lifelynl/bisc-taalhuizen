import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { PersonType } from 'graphql/v2/generated/graphql'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Reference {
    person: PersonType
    referredBy: string
    referredDate: string
}
interface Props {
    className?: string
    references: Reference[]
    itemTo: (reference: Reference) => string
}

export const ParticipantsReferenceTable: React.FC<Props> = ({ references, itemTo }) => {
    const { i18n } = useLingui()

    return (
        <Table
            flex={1}
            headers={getHeaders()}
            rows={getRows(references)}
            emptyMessage={i18n._(t`Er zijn nog geen verwijzingen`)}
        />
    )

    function getHeaders() {
        return [
            { headerLabel: i18n._(`Achternaam`), field: 'familyName' },
            { headerLabel: i18n._(`Roepnaam`), field: 'givenName' },
            { headerLabel: i18n._(`Verwezen door`), field: 'referredBy' },
            { headerLabel: i18n._(`Verwezen per`), field: 'referredAt' },
        ]
    }

    function getRows(references: Reference[]) {
        return references.map(reference => {
            return [
                <TableLink
                    text={(reference.person && NameFormatters.formattedLastName(reference.person)) || '-'}
                    to={itemTo(reference)}
                />,
                <Paragraph>{reference.person?.givenName}</Paragraph>,
                <Paragraph>{reference.referredBy}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(reference.referredDate)}</Paragraph>,
            ]
        })
    }
}
