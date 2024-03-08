import React from 'react'
import styles from './IconButton.module.scss'
import classNames from 'classnames'
import { IconType } from '../Icon/IconType'
import Icon from '../Icon/Icon'
import Spinner from '../Feedback/Spinner/Spinner'

interface Props {
    className?: string
    disabled?: boolean
    loading?: boolean
    submit?: boolean
    onClick?: () => void
    href?: string
    icon?: IconType
    stopClickPropagation?: boolean
    preventDefault?: boolean
}

export const IconButton: React.FunctionComponent<Props> = props => {
    const { disabled, loading, href, icon } = props
    const buttonClassName = getButtonClassName()

    if (href) {
        return renderAnchorButton()
    }

    return renderButton()

    function getButtonClassName() {
        const { className, disabled, loading } = props

        return classNames(styles.button, className, {
            [styles.isDisabled]: disabled,
            [styles.isLoading]: loading,
        })
    }

    function renderAnchorButton() {
        return (
            <a href={href} className={buttonClassName} onClick={handleClick}>
                {renderInner()}
            </a>
        )
    }

    function renderButton() {
        const { submit } = props
        const type = submit ? 'submit' : 'button'
        const buttonIsDisabled = disabled || loading

        return (
            <button type={type} className={buttonClassName} disabled={buttonIsDisabled} onClick={handleClick}>
                {renderInner()}
            </button>
        )
    }

    function renderInner() {
        return (
            <>
                <span className={styles.inner}>{icon && <Icon type={icon} className={styles.icon} />}</span>
                {loading && <Spinner small={true} className={styles.spinner} />}
            </>
        )
    }

    function handleClick(event: React.MouseEvent) {
        const { onClick, disabled, stopClickPropagation, preventDefault } = props

        if (disabled) {
            return
        }

        if (stopClickPropagation && event.stopPropagation) {
            event.stopPropagation()
        }

        if (preventDefault && event.preventDefault) {
            event.preventDefault()
        }

        if (onClick) {
            onClick()
        }
    }
}
