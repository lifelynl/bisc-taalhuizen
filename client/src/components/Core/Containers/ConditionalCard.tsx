import classNames from 'classnames'
import React from 'react'
import styles from './ConditionalCard.module.scss'
import { InfoBlock } from './InfoBlock'

interface Props {
    className?: string
    warning?: boolean
    grow?: boolean
}

const ConditionalCard: React.FunctionComponent<Props> = ({ className, children, warning, grow }) => {
    const containerClassNames = classNames(styles.container, className)

    if (warning) {
        return (
            <InfoBlock type="warning" grow={grow}>
                {children}
            </InfoBlock>
        )
    }
    return <div className={containerClassNames}>{children}</div>
}

export default ConditionalCard
