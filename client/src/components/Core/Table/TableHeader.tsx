import { SortInput } from 'graphql/v2/generated/graphql'
import { TableColumnAlignment } from './TableRow'
import styles from './Table.module.scss'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { IconType } from '../Icon/IconType'
import Icon from '../Icon/Icon'

interface Props {
    headers: TableHeaderProps[]
    sortDirection?: SortDirection
    flex: (number | string) | (number | string)[]
    lastItemIsIcon?: boolean
    onSortDirectionChange?: (sortDirection: SortDirection) => void
}

export interface TableHeaderProps {
    alignment?: TableColumnAlignment
    field: string
    headerLabel: string
    sortable?: boolean
}

export interface SortDirection {
    field: string
    direction: SortInput
}

export const TableHeader: React.FunctionComponent<Props> = props => {
    const [sortDirection, setSortDirection] = useState<SortDirection | undefined>(props.sortDirection)

    useEffect(() => {
        setSortDirection(props.sortDirection)
    }, [props.sortDirection])

    return (
        <thead className={styles.tableHeaderContainer}>
            <tr className={styles.tableRow}>
                {props.headers.map((h, i) => (
                    <th
                        key={i}
                        className={classNames(styles.title, {
                            [styles.columnAlignmentRight]: h.alignment === TableColumnAlignment.Right,
                            [styles.columnSortedOn]: sortDirection?.field === h.field,
                        })}
                        style={getFlexHeaderStyles(i)}
                        onClick={handleSortDirectionChange(h.field, h.sortable)}
                    >
                        {h.headerLabel}
                        {h.sortable && renderSortIcon(h.field)}
                    </th>
                ))}
            </tr>
        </thead>
    )

    // add style here
    function getFlexHeaderStyles(index: number) {
        const flexValues: any = { flex: Array.isArray(props.flex) ? props.flex[index] : props.flex }
        const isLastItem = index === props.headers.length - 1

        if (props.lastItemIsIcon && isLastItem) {
            flexValues.justifyContent = 'flex-end'
        }

        return flexValues
    }

    function renderSortIcon(field: string) {
        const icon =
            sortDirection?.field === field && sortDirection.direction === SortInput.Asc
                ? IconType.fullArrowUp
                : IconType.fullArrowDown

        return (
            <div className={styles.sortIcon}>
                <Icon
                    type={icon}
                    className={
                        sortDirection?.field === field ? styles.sortIconStylesActive : styles.sortIconStylesInactive
                    }
                />
            </div>
        )
    }

    function handleSortDirectionChange(field: string, sortable: boolean = false) {
        if (!sortable) {
            return
        }

        return (e: React.MouseEvent) => {
            e.preventDefault()

            let direction: SortInput = SortInput.Asc
            if (sortDirection?.field === field) {
                direction = sortDirection.direction === SortInput.Asc ? SortInput.Desc : SortInput.Asc
            }

            setSortDirection({ field, direction })
            props.onSortDirectionChange?.({ field, direction })
        }
    }
}
