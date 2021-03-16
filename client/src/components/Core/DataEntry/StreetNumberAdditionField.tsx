import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { FunctionComponent } from 'react'
import { AdressValidators } from '../../../utils/validators/AddressValidators'
import Input from './Input'
import styles from './StreetNumberAdditionField.module.scss'

export interface StreetNumberAdditionFieldModel {
    street?: string
    streetNr?: string
    addition?: string
}

interface Props {
    prefillData?: StreetNumberAdditionFieldModel
}

const StreetNumberAdditionField: FunctionComponent<Props> = props => {
    const { prefillData } = props
    const { i18n } = useLingui()

    return (
        <div className={styles.container}>
            <div className={styles.streetContainer}>
                <Input
                    name="street"
                    placeholder={i18n._(t`Straatnaam`)}
                    defaultValue={prefillData?.street}
                    grow={true}
                />
            </div>
            <div className={styles.streetNumberContainer}>
                <Input
                    name="streetNr"
                    placeholder={i18n._(t`Nr.`)}
                    validators={[AdressValidators.isValidHousenumber]}
                    defaultValue={prefillData?.streetNr}
                    grow={true}
                />
            </div>
            <div className={styles.additionContainer}>
                <Input name="addition" placeholder={i18n._(t`A`)} defaultValue={prefillData?.addition} grow={true} />
            </div>
        </div>
    )
}

export default StreetNumberAdditionField
