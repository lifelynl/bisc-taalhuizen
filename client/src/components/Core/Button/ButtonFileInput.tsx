import classNames from 'classnames'
import capitalize from 'lodash/capitalize'
import React from 'react'
import Spinner from '../Feedback/Spinner/Spinner'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import { MutationErrorContext } from '../MutationErrorProvider/MutationErrorProvider'
import styles from './Button.module.scss'

interface Props {
    type?: ButtonType
    id: string
    name: string
    onRef?: React.LegacyRef<HTMLInputElement>
    className?: string
    disabled?: boolean
    loading?: boolean
    danger?: boolean
    big?: boolean
    round?: boolean
    submit?: boolean
    onChangeFiles?: React.ChangeEventHandler<HTMLInputElement>
    onClick?: () => void
    visuallyHidden?: boolean
    stretch?: boolean
    href?: string
    icon?: IconType
    iconPosition?: 'top' | 'right' | 'bottom' // left is default
    stopClickPropagation?: boolean
    preventDefault?: boolean
    errorPath?: string[]
}

enum ButtonType {
    primary = 'primary',
    secondary = 'secondary',
    tertiary = 'tertiary',
    quaternary = 'quarternary',
    arrowLink = 'arrowLink',
}

export const ButtonFileInput: React.FunctionComponent<Props> = props => {
    const { disabled, loading, onChangeFiles, icon, big, visuallyHidden } = props
    const buttonClassName = getButtonClassName()

    return renderButton()

    function getButtonClassName() {
        const { iconPosition, className, disabled, loading, stretch, danger, big, round, type } = props
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
            [styles['visually-hidden']]: visuallyHidden,
        })
    }

    function renderButton() {
        const { id, onRef, name, errorPath, className } = props
        const buttonIsDisabled = disabled || loading

        return (
            <MutationErrorContext.Consumer>
                {({ findAndConsumeFieldErrors }) => {
                    const _errorPath = errorPath || props.name
                    const mutationErrors = _errorPath ? findAndConsumeFieldErrors(_errorPath) : []
                    const errorMessages = mutationErrors.map(e => e.message)

                    return (
                        <div
                            className={classNames(styles.container, className, {
                                [styles.hasErrorMessage]: errorMessages.length > 0,
                            })}
                        >
                            <label htmlFor={id} className={buttonClassName} onClick={handleClick}>
                                {renderInner()}
                            </label>
                            <input
                                ref={onRef}
                                type="file"
                                disabled={buttonIsDisabled}
                                onChange={onChangeFiles}
                                hidden={true}
                                id={id}
                                name={name}
                            />
                            {errorMessages.length > 0 &&
                                errorMessages.map((errorMessage, index) => (
                                    <p key={index} className={styles.errorMessage}>
                                        {errorMessage}
                                    </p>
                                ))}
                        </div>
                    )
                }}
            </MutationErrorContext.Consumer>
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
