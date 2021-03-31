import classNames from 'classnames'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import ReferenceStatusLabel, {
    ReferenceStatusLabelStatus,
} from 'components/Participants/components/ReferenceStatusLabel'
import React from 'react'
import styles from './ReferedStatus.module.scss'

interface Props {
    referedLabels: string[]
    readOnly?: boolean
}

const ReferedStatus: React.FunctionComponent<Props> = props => {
    const { referedLabels, readOnly } = props
    const containerClassNames = classNames(styles.container, { [styles['isReadOnly']]: readOnly })

    return (
        <div className={containerClassNames}>
            <Row spacing={1} className={styles.referedLabels}>
                {renderReferedLabels()}
            </Row>
            <ReferenceStatusLabel className={styles.statusLabel} status={ReferenceStatusLabelStatus.Refered} />
        </div>
    )

    function renderReferedLabels() {
        return referedLabels.map((reference, index, referedList) => {
            const isLast = referedList.length - 1 === index

            return (
                <>
                    <LabelTag label={reference} color={LabelColor.white} />
                    {!isLast && <Icon type={IconType.arrowRight} />}
                </>
            )
        })
    }
}

export default ReferedStatus
