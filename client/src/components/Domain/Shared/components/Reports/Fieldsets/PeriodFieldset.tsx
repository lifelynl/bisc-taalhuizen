import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import DateInput from 'components/Core/DataEntry/DateInput'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { LanguageHouseSelect } from 'components/Domain/LanguageHouse/Select/LanguageHouseSelect'
import styles from './PeriodFieldset.module.scss'

interface Props {
    prefillData?: LanguageHousePeriodFieldsetPrefillData
    showLanguageHouseSelect?: boolean
}

interface LanguageHousePeriodFieldsetPrefillData {
    organization?: string
    periodFrom?: string
    periodTo?: string
}

export interface LanguageHousePeriodFieldsetFormModel {
    organization: string
    periodFrom?: string
    periodTo?: string
}

export interface ProviderPeriodFieldsetFormModel {
    periodFrom?: string
    periodTo?: string
}

export const PeriodFieldset: React.FunctionComponent<Props> = props => {
    const { showLanguageHouseSelect } = props
    const { i18n } = useLingui()

    const periodFieldClassNames = classNames({
        [styles.periodFieldWithoutSelect]: !showLanguageHouseSelect,
        [styles.periodFieldWithSelect]: showLanguageHouseSelect,
    })

    return (
        <Column spacing={4}>
            <Row spacing={5}>
                {showLanguageHouseSelect && <LanguageHouseSelect name="organization" />}
                <Row spacing={5} className={styles.periodWrapper}>
                    <div className={periodFieldClassNames}>
                        <Field label={i18n._(t`Periode van`)} grow={true}>
                            <DateInput name={'periodFrom'} placeholder={i18n._(t`DD/MM/YYYY`)} grow={true} />
                        </Field>
                    </div>
                    <div className={periodFieldClassNames}>
                        <Field label={i18n._(t`periode tot`)} grow={true}>
                            <DateInput name={'periodTo'} placeholder={i18n._(t`DD/MM/YYYY`)} grow={true} />
                        </Field>
                    </div>
                </Row>
            </Row>
        </Column>
    )
}
