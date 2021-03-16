import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'
import { IconType } from '../Icon/IconType'
import Icon from '../Icon/Icon'
import Spinner from '../Feedback/Spinner/Spinner'
import capitalize from 'lodash/capitalize'

interface Props {
    type?: ButtonType
    className?: string
    disabled?: boolean
    loading?: boolean
    danger?: boolean
    big?: boolean
    round?: boolean
    submit?: boolean
    onClick?: () => void
    stretch?: boolean
    href?: string
    icon?: IconType
    iconPosition?: 'top' | 'right' | 'bottom' // left is default
    stopClickPropagation?: boolean
    preventDefault?: boolean
}

export enum ButtonType {
    primary = 'primary',
    secondary = 'secondary',
    tertiary = 'tertiary',
    arrowLink = 'arrowLink',
}

const Button: React.FunctionComponent<Props> = props => {
    const { disabled, loading, href, icon, big } = props
    const buttonClassName = getButtonClassName()

    if (href) {
        return renderAnchorButton()
    }

    return renderButton()

    function getButtonClassName() {
        const { iconPosition, className, disabled, loading, stretch, type, danger, big, round } = props
        const position = capitalize(iconPosition ? iconPosition : 'left')
        const buttonType = type ? type : ButtonType.primary

        return classNames(styles.button, className, {
            [styles[`icon-is${position}`]]: position,
            [styles[buttonType]]: buttonType,
            [styles.isStretched]: stretch,
            [styles.isDisabled]: disabled,
            [styles.isLoading]: loading,
            [styles.isDanger]: danger,
            [styles.isBig]: big,
            [styles.isRound]: round,
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
        const { children } = props

        return (
            <>
                <span className={styles.inner}>
                    {icon && <Icon type={icon} className={styles.icon} />}
                    {children}
                </span>
                {loading && <Spinner small={!big} className={styles.spinner} />}
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

export default Button
