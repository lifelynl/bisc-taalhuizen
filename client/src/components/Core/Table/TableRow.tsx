import classNames from 'classnames'
import styles from './Table.module.scss'
import { TableHeaderProps } from './TableHeader'

interface Props {
    row: JSX.Element[]
    flex: (number | string) | (number | string)[]
    lastItemIsIcon?: boolean
    headers: TableHeaderProps[]
}

export enum TableColumnAlignment {
    Left,
    Right,
}

export const TableRow: React.FunctionComponent<Props> = props => {
    return (
        <tr className={styles.row}>
            {props.row.map((item, i) => (
                <td
                    key={i}
                    style={getFlexRowStyles(i)}
                    className={classNames(styles.rowItem, {
                        [styles.columnAlignmentRight]: props.headers[i].alignment === TableColumnAlignment.Right,
                    })}
                >
                    {item}
                </td>
            ))}
        </tr>
    )

    function getFlexRowStyles(index: number) {
        const flexValues: any = {
            flex: Array.isArray(props.flex) ? props.flex[index] : props.flex,
            display: 'flex',
            alignItems: 'center',
        }
        const isLastItem = index === props.headers.length - 1

        if (props.lastItemIsIcon && isLastItem) {
            flexValues.justifyContent = 'flex-end'
        }

        return flexValues
    }
}
