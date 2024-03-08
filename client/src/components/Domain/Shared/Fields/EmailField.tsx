import { useLingui } from '@lingui/react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Input from 'components/Core/DataEntry/Input'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useDoesPersonEmailExistLazyQuery } from 'graphql/v2/generated/graphql'
import React from 'react'
import styles from './EmailField.module.scss'
import Column from 'components/Core/Layout/Column/Column'
import { BooleanCheckboxValue } from 'utils/forms'

interface Props {
    name: string
    placeholder?: string
    defaultValue?: string
    checkForDuplicate?: boolean
    isSecondaryEmail?: boolean
}

export const SECONDARY_EMAIL_CHECKBOX_NAME = 'saveEmailAsSecondaryEmail'

export const EmailField: React.FC<Props> = props => {
    const { name, placeholder, defaultValue, isSecondaryEmail } = props

    const { i18n } = useLingui()
    const [showWarning, setShowWarning] = React.useState(false)
    const [showCheckbox, setShowCheckbox] = React.useState(isSecondaryEmail)
    const [doesPersonEmailExist] = useDoesPersonEmailExistLazyQuery()

    return (
        <Column spacing={4} className={styles.container}>
            <Input
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onBlur={e => checkEmail(e.target.value)}
            />
            {showCheckbox && renderCheckbox()}
        </Column>
    )

    function renderCheckbox() {
        return (
            <div>
                {showWarning && renderWarning()}
                <div className={!showWarning ? styles.checkbox : styles.checkboxWithoutWarning}>
                    <Checkbox
                        label={i18n._('Dit is een gedeeld e-mailadres')}
                        name={SECONDARY_EMAIL_CHECKBOX_NAME}
                        onChange={e => setShowWarning(!e.currentTarget.checked)}
                        value={BooleanCheckboxValue.yes}
                        defaultChecked={isSecondaryEmail}
                    />
                </div>
            </div>
        )
    }

    function renderWarning() {
        return (
            <Row className={styles.warning}>
                <Icon className={styles.icon} type={IconType.warning} />
                <Paragraph>{i18n._('Dit e-mailadres wordt al gebruikt door een andere deelnemer.')}</Paragraph>
            </Row>
        )
    }

    async function checkEmail(email: string) {
        email = email.trim()
        if (!email) {
            setShowCheckbox(false)
            setShowWarning(false)
            return
        }

        if (email === defaultValue) {
            setShowCheckbox(isSecondaryEmail)
            setShowWarning(false)
            return
        }

        const response = await doesPersonEmailExist({ variables: { email }, fetchPolicy: 'network-only' })
        if (response.data?.doesPersonEmailExist) {
            setShowCheckbox(true)
            setShowWarning(true)
            return
        }

        setShowCheckbox(false)
        setShowWarning(false)
    }
}
