import styles from './Notification.module.scss'
import * as React from 'react'
import classNames, { Value as ClassValue } from 'classnames'
import Icon from '../../Icon/Icon'
import { IconType } from '../../Icon/IconType'
import { NotificationType } from './types'
import Row from '../../Layout/Row/Row'
import Column from '../../Layout/Column/Column'
import SectionTitle from '../../Text/SectionTitle'
import Paragraph from '../../Typography/Paragraph'
import capitalize from 'lodash/capitalize'

interface Props {
    className?: ClassValue
    title: string
    message?: string
    type: NotificationType
    children: React.ReactNode
}
type RefProps = HTMLElement | undefined

const Notification = React.forwardRef<RefProps, Props>((props, ref) => {
    const { type, title, message, className } = props

    const containerClassNames = classNames(styles.container, className, {
        [styles[`is${capitalize(type)}`]]: type,
    })

    const getIconType = () => {
        switch (props.type) {
            case NotificationType.success:
                return IconType.checkmark
            case NotificationType.warning:
                return IconType.warning
            case NotificationType.error:
                return IconType.close
        }
    }

    return (
        <Row className={containerClassNames} ref={ref}>
            <Column className={styles.iconContainer}>
                <Icon type={getIconType()} className={styles.icon} />
            </Column>
            <Column className={styles.textContainer}>
                <SectionTitle title={title} heading="H5" className={styles.text} />
                {message && <Paragraph className={styles.text}>{message}</Paragraph>}
            </Column>
        </Row>
    )
})

export default Notification
