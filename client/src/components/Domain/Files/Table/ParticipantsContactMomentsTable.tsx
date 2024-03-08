import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Label from 'components/Core/Label/Label'
import React, { useState } from 'react'
import { ContactMomentsDateContainer } from '../DateContainer/ContactMomentsDateContainer'
import { ContactMomentsListItem } from '../List/ContactMomentsListItem/ContactMomentsListItem'
import styles from './ParticipantsContactMomentsTable.module.scss'
import { getMonthAbbreviation } from 'utils/formatters/Date/Date'
import { StudentContactMomentType } from 'graphql/v2/generated/graphql'
import { ContactMomentsCreateForm } from '../Fieldsets/Create/ContactMomentsCreateForm'
import { ContactMomentsDetailUpdateForm } from '../Fieldsets/Detail/Update/ContactMomentsDetailUpdateForm'
import { ContactMomentsDetailReadFields } from '../Fieldsets/Detail/Read/ContactMomentsDetailReadFields'
import { ContactMomentsSuccesView } from '../Fieldsets/Success/ContactMomentsSuccessView'
import Row from 'components/Core/Layout/Row/Row'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import { InfiniteScroll, PaginationArgs } from 'components/Core/InfiniteScroll/InfiniteScroll'
import { EmptyState } from 'components/Core/EmptyState/EmptyState'

interface Props {
    rows: StudentContactMomentType[]
    canCreate?: boolean
    dossierIdURLParam?: boolean
    hasMore: boolean
    loadMore: (LoadMoreParams: PaginationArgs) => Promise<any>
    studentId: string
}

enum DetailPanelType {
    ContactMomentDetails = 'ContactMomentDetails',
    CreateContactMoment = 'CreateContactMoment',
    CreateSuccess = 'CreateSuccess',
    EditContactMoment = 'EditContactMoment',
    EditSuccess = 'EditSuccess',
    DeleteSuccess = 'DeleteSuccess',
}

interface DetailPanelState {
    type: DetailPanelType
    contactMomentId?: string
}

export const ParticipantsContactMomentsTable: React.FunctionComponent<Props> = props => {
    const { rows, canCreate, studentId } = props
    const { i18n } = useLingui()
    const [detailPanelState, setDetailPanelState] = useState<DetailPanelState>(getDefaultDetailPanelState())

    const createButtonRowClassNames = classNames(styles.createButtonRow, {
        [styles.createStateIsActive]: detailPanelState.type === DetailPanelType.CreateContactMoment,
    })

    return (
        <div className={styles.tableContainer}>
            {canCreate && (
                <Row justifyContent="flex-end" className={createButtonRowClassNames}>
                    <Button
                        icon={IconType.add}
                        onClick={() => {
                            setDetailPanelState({
                                type: DetailPanelType.CreateContactMoment,
                            })
                        }}
                    >
                        {i18n._(t`Gebeurtenis toevoegen`)}
                    </Button>
                </Row>
            )}
            <div className={styles.tableHeaderContainer}>
                <div className={styles.tableRow}>{renderHeaders([i18n._(t`Datum`), i18n._(t`Gebeurtenis`)])}</div>
                <div className={styles.detailsLabel}>
                    <Label className={styles.title} text={i18n._(t`Details`)} />
                </div>
            </div>
            <div className={styles.containerBody}>
                <div className={styles.scrollContainer}>
                    {detailPanelState.type === DetailPanelType.CreateContactMoment &&
                        canCreate &&
                        renderCreatePlaceholder()}
                    <InfiniteScroll hasMore={props.hasMore} loadMore={props.loadMore}>
                        {renderRows()}
                    </InfiniteScroll>
                </div>
                <div className={styles.eventDetailContainer}>{renderDetailView()}</div>
            </div>
        </div>
    )

    function renderHeaders(headers: string[]) {
        return headers.map((title, i) => {
            if (i === 0) {
                return (
                    <div key={i} className={classNames(styles.tableRow, styles.dateRow)}>
                        <Label className={styles.title} text={title} />
                    </div>
                )
            }

            return (
                <div key={i} className={classNames(styles.tableRow, styles.eventsRow)}>
                    <Label className={styles.title} text={title} />
                </div>
            )
        })
    }

    function renderCreatePlaceholder() {
        return (
            <div className={styles.row}>
                <div className={classNames(styles.tableRow, styles.dateRow)}>
                    <ContactMomentsDateContainer title={''} />
                </div>
                <div className={classNames(styles.tableRow, styles.eventsRow)}>
                    <ContactMomentsListItem />
                </div>
            </div>
        )
    }

    function renderRows() {
        if (!rows.length) {
            return <EmptyState message={i18n._('Er zijn nog geen gegevens')} />
        }

        return rows?.map((item, index) => {
            const date = new Date(item.date)

            return (
                <div className={styles.row} key={index}>
                    <div className={classNames(styles.tableRow, styles.dateRow)}>
                        <ContactMomentsDateContainer
                            title={date.getDate().toString()}
                            subtitle={{
                                month: getMonthAbbreviation(date.getMonth() + 1), // getMonth returns 0-11
                                year: date.getFullYear().toString(),
                            }}
                        />
                    </div>
                    <div className={classNames(styles.tableRow, styles.eventsRow)}>
                        <ContactMomentsListItem
                            data={item}
                            onClick={() => {
                                setDetailPanelState({
                                    type: DetailPanelType.ContactMomentDetails,
                                    contactMomentId: item.id,
                                })
                            }}
                            isActive={
                                [
                                    DetailPanelType.ContactMomentDetails,
                                    DetailPanelType.CreateSuccess,
                                    DetailPanelType.EditContactMoment,
                                ].includes(detailPanelState.type) && detailPanelState.contactMomentId === item.id
                            }
                        />
                    </div>
                </div>
            )
        })
    }

    function renderDetailView() {
        const activeContactMoment = getActiveContactMomentDetails()

        if (detailPanelState.type === DetailPanelType.ContactMomentDetails && activeContactMoment) {
            return (
                <ContactMomentsDetailReadFields
                    data={activeContactMoment}
                    isEditable={activeContactMoment.canEdit}
                    onClickEdit={() => {
                        setDetailPanelState({
                            type: DetailPanelType.EditContactMoment,
                            contactMomentId: activeContactMoment.id,
                        })
                    }}
                />
            )
        }

        if (!canCreate && !activeContactMoment?.canEdit) {
            return null
        }

        if (detailPanelState.type === DetailPanelType.CreateContactMoment) {
            return (
                <ContactMomentsCreateForm
                    studentId={studentId}
                    onClickCancel={() => {
                        setDetailPanelState(getDefaultDetailPanelState())
                    }}
                    handleSuccess={newContactMomentId => {
                        setDetailPanelState({
                            type: DetailPanelType.CreateSuccess,
                            contactMomentId: newContactMomentId,
                        })
                    }}
                />
            )
        }

        if (detailPanelState.type === DetailPanelType.CreateSuccess) {
            return <ContactMomentsSuccesView message={i18n._(t`Gebeurtenis succesvol toegevoegd`)} />
        }

        if (detailPanelState.type === DetailPanelType.EditContactMoment && activeContactMoment) {
            return (
                <ContactMomentsDetailUpdateForm
                    defaultValues={activeContactMoment}
                    onClickCancel={() => {
                        setDetailPanelState(getDefaultDetailPanelState())
                    }}
                    handleSuccess={editedContactMomentId => {
                        setDetailPanelState({
                            type: DetailPanelType.EditSuccess,
                            contactMomentId: editedContactMomentId,
                        })
                    }}
                    onDelete={() => {
                        setDetailPanelState({
                            type: DetailPanelType.DeleteSuccess,
                        })
                    }}
                />
            )
        }

        if (detailPanelState.type === DetailPanelType.EditSuccess) {
            return <ContactMomentsSuccesView message={i18n._(t`Gebeurtenis succesvol bijgewerkt`)} />
        }

        if (detailPanelState.type === DetailPanelType.DeleteSuccess) {
            return <ContactMomentsSuccesView message={i18n._(t`Gebeurtenis succesvol verwijderd`)} />
        }
    }

    function getDefaultDetailPanelState(): DetailPanelState {
        if (rows[0]) {
            return {
                type: DetailPanelType.ContactMomentDetails,
                contactMomentId: rows[0].id,
            }
        }

        return {
            type: DetailPanelType.CreateContactMoment,
        }
    }

    function getActiveContactMomentDetails(): StudentContactMomentType | undefined {
        if (detailPanelState.contactMomentId) {
            return rows?.find(row => {
                return row.id === detailPanelState.contactMomentId
            })
        }
    }
}
