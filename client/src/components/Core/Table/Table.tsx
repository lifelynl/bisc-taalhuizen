import React from 'react'
import styles from './Table.module.scss'
interface Props {
    headers: string[]
    rows: JSX.Element[][]
    flex: number | number[]
    lastItemIsIcon?: boolean
}

export const Table: React.FunctionComponent<Props> = ({ headers, rows, flex, lastItemIsIcon }) => {
    return (
        <div>
            <table className={styles.tableContainer}>
                <thead className={styles.tableHeaderContainer}>
                    {headers.map((title, i) => (
                        <tr key={i} className={styles.tableRow} style={getFlexHeaderStyles(i)}>
                            <th className={styles.title}>{title}</th>
                        </tr>
                    ))}
                </thead>

                <tbody className={styles.containerBody}>{renderRows()}</tbody>
            </table>
        </div>
    )

    function renderRows() {
        return rows?.map((row, index) => (
            <tr className={styles.row} key={index}>
                {row.map((item, i) => (
                    <td key={i} style={getFlexRowStyles(i)} className={styles.rowItem}>
                        {item}
                    </td>
                ))}
            </tr>
        ))
    }

    function getFlexRowStyles(index: number) {
        const flexValues = { flex: Array.isArray(flex) ? flex[index] : flex }
        console.log(index)
        if (lastItemIsIcon && index === headers.length - 1) {
            return { flex: 0 }
        }

        return flexValues
    }

    function getFlexHeaderStyles(index: number) {
        const flexValues = { flex: Array.isArray(flex) ? flex[index] : flex }

        if (lastItemIsIcon && index === headers.length - 1) {
            return { flex: 0, minWidth: '60px' }
        }

        return flexValues
    }
}
