import { t } from '@lingui/macro'
import { OrganizationIntakeFields, OrganizationQuery } from 'graphql/v2/generated/graphql'
import { useLingui } from '@lingui/react'
import { Table } from 'components/Core/Table/Table'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    MandatoryIntakeSettings,
    sortedIntakeSettings,
} from 'components/Domain/LanguageHouse/Translations/intakeSettings'
import { intakeSettingsTranslations } from 'components/Domain/LanguageHouse/Translations/translations'
import Icon, { IconStyle } from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import { TableColumnAlignment } from 'components/Core/Table/TableRow'

export interface IntakeSettingsFieldsFormModel {
    /**
     * Please note, this is enabledIntakeFields, not disabledIntakeFields
     * so this needs to be 'reversed' before sending to the api
     */
    enabledIntakeFields: OrganizationIntakeFields[]
}

interface Props {
    organization?: Pick<OrganizationQuery['organization'], 'disabledIntakeFields'>
    readOnly?: boolean
}

export const IntakeSettingsFields: React.FC<Props> = props => {
    const { organization, readOnly } = props
    const { i18n } = useLingui()

    return (
        <Table
            flex={1}
            headers={[
                { headerLabel: i18n._(t`Onderdeel`), field: 'intake' },
                { headerLabel: i18n._(t`Zichtbaar`), field: 'visibility', alignment: TableColumnAlignment.Right },
            ]}
            rows={getRows()}
            emptyMessage={i18n._(t`Er zijn nog geen onderdelen`)}
        />
    )

    function getRows() {
        return sortedIntakeSettings.map((intakeSetting: OrganizationIntakeFields | MandatoryIntakeSettings) => {
            return [
                <Paragraph bold={true}>{intakeSettingsTranslations[intakeSetting]}</Paragraph>,
                renderVisibility(intakeSetting),
            ]
        })
    }

    function renderVisibility(intakeSetting: OrganizationIntakeFields | MandatoryIntakeSettings) {
        const isIntakeFieldDisabled = organization?.disabledIntakeFields?.includes(
            intakeSetting as OrganizationIntakeFields
        )

        if (intakeSetting in MandatoryIntakeSettings) {
            return <Paragraph>{i18n._(t`Altijd onderdeel van intakeformulier`)}</Paragraph>
        }

        if (readOnly) {
            if (isIntakeFieldDisabled) {
                return <Icon type={IconType.close} iconStyle={IconStyle.Disabled} />
            }

            return <Icon type={IconType.checkmark} iconStyle={IconStyle.Enabled} />
        }

        return (
            <Checkbox
                inline={true}
                value={intakeSetting}
                defaultChecked={!isIntakeFieldDisabled}
                name={'enabledIntakeFields[]'}
            />
        )
    }
}
