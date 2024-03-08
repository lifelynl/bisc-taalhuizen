import { EmptyState } from '../EmptyState/EmptyState'
import styles from './Table.module.scss'
import { SortDirection, TableHeader, TableHeaderProps } from './TableHeader'
import { TableRow } from './TableRow'

interface TableProps {
    headers: TableHeaderProps[]
    rows: JSX.Element[][] | null
    flex: (number | string) | (number | string)[]
    lastItemIsIcon?: boolean
    emptyMessage: string
    onSortDirectionChange?: (sortDirection: SortDirection) => void
    sortDirection?: SortDirection
}

export const Table: React.FunctionComponent<TableProps> = props => {
    return (
        <div>
            <table className={styles.tableContainer}>
                <TableHeader
                    headers={props.headers}
                    sortDirection={props.sortDirection}
                    flex={props.flex}
                    lastItemIsIcon={props.lastItemIsIcon}
                    onSortDirectionChange={props.onSortDirectionChange}
                />
                <tbody className={styles.containerBody}>{renderRows()}</tbody>
            </table>
        </div>
    )

    function renderRows() {
        if (!props.rows?.length) {
            return <EmptyState message={props.emptyMessage} />
        }

        return props.rows?.map((row, index) => (
            <TableRow key={index} row={row} flex={props.flex} headers={props.headers} />
        ))
    }
}
