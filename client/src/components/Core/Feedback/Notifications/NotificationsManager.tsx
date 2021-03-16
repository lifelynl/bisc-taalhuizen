import uniqueId from 'lodash/uniqueId'
import * as React from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { default as NotificationBlock } from './Notification'
import { Parameters, NotificationType } from './types'
import styles from './NotificationsManager.module.scss'

interface Props {
    className?: string
}

interface NotificationOptions {
    wait?: number
    timeout?: number
    onClick?: (notification: Parameters) => void
}

interface State {
    notifications: Parameters[]
}

const DEFAULT_WAIT_TIME = 0
const DEFAULT_TIMEOUT_BY_TYPE = {
    success: 5000,
    error: 5000,
    warning: 5000,
    info: 5000,
}

export class NotificationsManager extends React.Component<Props, State> {
    private static addNotification: (
        type: NotificationType,
        title: string,
        message: string,
        opts?: NotificationOptions
    ) => void

    public state: State = {
        notifications: [],
    }

    private timeouts: number[] = []
    private el?: HTMLElement | null = document.createElement('div')
    private root?: HTMLElement | null

    public static success = (title: string, message: string, opts?: NotificationOptions) => {
        NotificationsManager.addNotification(NotificationType.success, title, message, opts)
    }

    public static warning = (title: string, message: string, opts?: NotificationOptions) => {
        NotificationsManager.addNotification(NotificationType.warning, title, message, opts)
    }

    public static error = (title: string, message: string, opts?: NotificationOptions) => {
        NotificationsManager.addNotification(NotificationType.error, title, message, opts)
    }

    public componentDidMount() {
        this.root = document.getElementById('notification-root')
        NotificationsManager.addNotification = this.addNotification

        if (this.root && this.el) {
            this.root.appendChild(this.el)
        }
    }

    public componentWillUnmount() {
        this.timeouts.forEach(timeout => window.clearTimeout(timeout))

        if (this.root && this.el) {
            this.root.removeChild(this.el)
        }
    }

    public render() {
        if (this.el) {
            this.el.className = styles.container
        }

        return this.el && createPortal(this.renderNotification(), this.el)
    }

    public renderNotification() {
        const { notifications } = this.state

        return (
            <TransitionGroup className={styles.transitionGroup}>
                {notifications.map(notification => (
                    <CSSTransition
                        key={notification.id}
                        timeout={500}
                        onEntered={() => this.onNotificationEnter(notification)}
                        in={true}
                        classNames={{
                            enterActive: styles.enterActive,
                            enter: styles.enter,
                            exit: styles.exit,
                            exitActive: styles.exitActive,
                        }}
                    >
                        <NotificationBlock
                            title={notification.title}
                            message={notification.message}
                            className={styles.notification}
                            type={notification.type}
                        >
                            {notification.message}
                        </NotificationBlock>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        )
    }

    public addNotification = (
        type: NotificationType,
        title: string,
        message: string,
        opts: NotificationOptions = {}
    ) => {
        const id = uniqueId()
        const notification: Parameters = {
            id,
            dismiss: () => {
                this.removeNotification(id)
            },
            title,
            message,
            type,
            timeout: opts.timeout || DEFAULT_TIMEOUT_BY_TYPE[type],
        }

        setTimeout(
            () => {
                this.setState((state: State) => ({
                    notifications: [...state.notifications, notification],
                }))
            },
            opts.wait ? opts.wait : DEFAULT_WAIT_TIME
        )
    }

    public removeNotification(idToRemove: string) {
        const { notifications } = this.state

        this.setState({
            notifications: notifications.filter(({ id }) => id !== idToRemove),
        })
    }

    public onNotificationEnter(notification: Parameters) {
        this.timeouts.push(
            window.setTimeout(() => {
                notification.dismiss()
            }, notification.timeout)
        )
    }
}
