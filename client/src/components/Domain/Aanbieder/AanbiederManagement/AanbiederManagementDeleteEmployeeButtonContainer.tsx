import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

import Button, { ButtonType } from 'components/Core/Button/Button'
import Modal from 'components/Core/Modal/Modal'
import ModalView from 'components/Core/Modal/ModalView'
import Column from 'components/Core/Layout/Column/Column'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import Row from 'components/Core/Layout/Row/Row'
import { IconType } from 'components/Core/Icon/IconType'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'

interface Props {
    employeeId: number
    employeeName: string
    loading: boolean
}

export const AanbiederManagementDeleteEmployeeButtonContainer: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [isVisible, setIsVisible] = useState(false)

    const { loading } = props

    return (
        <>
            <Button
                type={ButtonType.quaternary}
                danger={true}
                icon={IconType.delete}
                loading={loading}
                onClick={() => setIsVisible(true)}
            >
                {i18n._(t`Medewerker verwijderen`)}
            </Button>
            <Modal isOpen={isVisible} onRequestClose={() => setIsVisible(false)}>
                <ModalView
                    onClose={() => setIsVisible(false)}
                    ContentComponent={renderContent()}
                    BottomComponent={renderButtons()}
                />
            </Modal>
        </>
    )

    function renderContent() {
        const { employeeName } = props
        const message =
            'Weet je zeker dat je het medewerker wilt verwijderen? Deze medewerker zal geen toegang meer hebben tot de applicatie.'

        return (
            <Column spacing={6}>
                <SectionTitle
                    heading="H4"
                    title={i18n._(t`Medewerker ${employeeName} verwijderen`, { employeeName })}
                />
                <Paragraph>{i18n._(t({ id: message }))}</Paragraph>
            </Column>
        )
    }

    function renderButtons() {
        return (
            <Row justifyContent="flex-end">
                {/* TODO: use delete mutation loading */}
                <Button type={ButtonType.secondary} disabled={loading} onClick={() => setIsVisible(false)}>
                    {i18n._(t`Annuleren`)}
                </Button>
                <Button
                    danger={true}
                    type={ButtonType.primary}
                    icon={IconType.delete}
                    onClick={handleDelete}
                    loading={loading} // TODO: use delete mutation loading
                >
                    {i18n._(t`Verwijderen`)}
                </Button>
            </Row>
        )
    }

    // TODO
    function handleDelete() {
        history.push(supplierRoutes.management.employees.overview)
        return
    }
}
