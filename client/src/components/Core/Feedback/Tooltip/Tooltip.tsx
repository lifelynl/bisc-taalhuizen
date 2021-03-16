import React from 'react'
import classNames from 'classnames'
import ReactTooltip from 'react-tooltip'

import styles from './Tooltip.module.scss'
import Paragraph from '../../Typography/Paragraph'
import uniqueId from 'lodash/uniqueId'

interface Props {
    className?: string
    content?: React.ReactNode
    message?: string
    disabled?: boolean
    direction?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip: React.FunctionComponent<Props> = props => {
    const { className, children, direction, disabled } = props
    const id = uniqueId()
    const tooltipClassName = classNames(styles.tooltip, className)

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a data-tip={true} data-for={`tooltip-${id}`}>
                {children}
            </a>
            <ReactTooltip
                arrowColor="transparent"
                disable={disabled}
                place={direction}
                className={tooltipClassName}
                id={`tooltip-${id}`}
                effect="solid"
            >
                {renderContent()}
            </ReactTooltip>
        </>
    )

    function renderContent() {
        const { message, content } = props

        if (content) {
            return content
        }

        return (
            <Paragraph small={true} bold={true} className={styles.message}>
                {message}
            </Paragraph>
        )
    }
}

export default Tooltip
