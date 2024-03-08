import classNames from 'classnames'
import Button, { ButtonType } from 'components/Core/Button/Button'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import React from 'react'
import styles from './ReferenceCard.module.scss'

interface Props {
    TopComponent?: JSX.Element
    BottomComponent?: JSX.Element
    showEditButton?: boolean
    isReadOnly?: boolean
    onClickEditTopComponent?: () => void
    onClickEditBottomComponent?: () => void
}

export const ReferenceCard: React.FunctionComponent<Props> = props => {
    const {
        TopComponent,
        BottomComponent,
        showEditButton,
        isReadOnly,
        onClickEditTopComponent,
        onClickEditBottomComponent,
    } = props
    const containerClassNames = classNames(styles.container, {
        [styles['isReadOnly']]: isReadOnly,
    })

    return (
        <div className={containerClassNames}>
            {TopComponent && (
                <div className={styles.content}>
                    {showEditButton && onClickEditTopComponent && (
                        <Button
                            className={styles.editIcon}
                            round={true}
                            type={ButtonType.tertiary}
                            icon={IconType.edit}
                            onClick={onClickEditTopComponent}
                        />
                    )}
                    {TopComponent}
                </div>
            )}
            {BottomComponent && <HorizontalRule spacingDisabled={true} />}
            {BottomComponent && (
                <div className={styles.bottom}>
                    {showEditButton && onClickEditBottomComponent && (
                        <Button
                            className={styles.editIcon}
                            round={true}
                            type={ButtonType.tertiary}
                            icon={IconType.edit}
                            onClick={onClickEditBottomComponent}
                        />
                    )}
                    {BottomComponent}
                </div>
            )}
        </div>
    )
}
