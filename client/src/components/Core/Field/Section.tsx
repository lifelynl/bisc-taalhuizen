import classNames from 'classnames'
import React from 'react'
import Column from '../Layout/Column/Column'
import styles from './Section.module.scss'
import { SectionTitleWithBorder, SectionTitleWithBorderProps } from './SectionTitleWithBorder'

interface Props extends SectionTitleWithBorderProps {
    className?: string
    useFullWidthContent?: boolean
}

const Section: React.FunctionComponent<Props> = props => {
    const { children, className, title, description, useFullWidthContent } = props

    const containerClassNames = classNames(styles.container, className)

    return <div className={containerClassNames}>{renderContainerContent()}</div>

    function renderContainerContent() {
        if (useFullWidthContent) {
            return (
                <Column spacing={10}>
                    {renderSectionTitle()}
                    {children}
                </Column>
            )
        }

        return (
            <>
                <div className={styles.leftContainer}>{renderSectionTitle()}</div>
                <div className={styles.formContainer}>{children}</div>
            </>
        )
    }

    function renderSectionTitle() {
        return <SectionTitleWithBorder title={title} description={description} />
    }
}

export default Section
