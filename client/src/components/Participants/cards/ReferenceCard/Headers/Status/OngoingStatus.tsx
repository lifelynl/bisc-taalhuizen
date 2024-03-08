import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import ReferenceStatusLabel from 'components/Participants/components/ReferenceStatusLabel'
import { ParticipationProviderOption, ParticipationStatus } from 'graphql/v2/generated/graphql'
import React from 'react'
import styles from './OngoingStatus.module.scss'

interface Props {
    title: string
    languageHouseName?: string
    providerName?: string
    providerOption: ParticipationProviderOption
    status: ParticipationStatus
    isOwnReference?: boolean
    hasEducationGroup?: boolean
    hasMentor?: boolean
}

export const OngoingStatus: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const {
        title,
        languageHouseName,
        providerName,
        status,
        providerOption,
        isOwnReference,
        hasEducationGroup,
        hasMentor,
    } = props

    const containerClassNames = classNames(styles.container, {
        [styles.isOwnReference]: isOwnReference,
        [styles.isStatusOngoing]: status === ParticipationStatus.Ongoing,
        [styles.isStatusReferred]: [ParticipationStatus.Referred, ParticipationStatus.AutoCreated].includes(status),
    })

    return (
        <Column className={containerClassNames}>
            {status === ParticipationStatus.AutoCreated && renderInfoForAutoCreatedStatus()}
            {status === ParticipationStatus.Referred && renderInfoForReferredStatus()}
            {(status === ParticipationStatus.Ongoing || status === ParticipationStatus.Finished) &&
                renderInfoForOngoingStatus()}
            <ReferenceStatusLabel className={styles.statusLabel} status={status} />
        </Column>
    )

    function renderInfoForAutoCreatedStatus() {
        if (providerOption !== ParticipationProviderOption.Provider) {
            return null
        }

        return <LabelTag label={providerName!} color={LabelColor.white} />
    }

    function renderInfoForReferredStatus() {
        if (providerOption === ParticipationProviderOption.Provider) {
            // referral from language house to provider
            return (
                <>
                    <Row spacing={1}>
                        <LabelTag label={languageHouseName!} color={LabelColor.white} />
                        <Icon type={IconType.arrowRight} />
                        <LabelTag label={providerName!} color={LabelColor.white} />
                    </Row>
                </>
            )
        }

        if (providerOption === ParticipationProviderOption.Other) {
            // referral within own language house
            // referred status does not exist in this case
            return null
        }
    }

    function renderInfoForOngoingStatus() {
        if (providerOption === ParticipationProviderOption.Provider) {
            // referral from language house to provider
            return (
                <>
                    <p className={styles.title}>{title}</p>
                    <Row className={styles.participantGroupMeta} spacing={2}>
                        <span className={styles.participantGroup}>{providerName}</span>
                        <p>
                            {hasEducationGroup && i18n._('Deelnamegroep')}
                            {hasMentor && i18n._('Begeleider')}
                        </p>
                    </Row>
                </>
            )
        }

        if (providerOption === ParticipationProviderOption.Other) {
            // referral within own language house
            return (
                <>
                    <p className={styles.title}>{title}</p>
                    <Row className={styles.participantGroupMeta} spacing={2}>
                        <span className={styles.participantGroup}>{providerName}</span>
                        <p>{i18n._('Deelname')}</p>
                    </Row>
                </>
            )
        }
    }
}
