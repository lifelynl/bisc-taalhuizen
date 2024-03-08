import React, { ChangeEvent } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'

interface Props {
    hasAcceptedToShareDetailsWithLanguageHouse: boolean
    setHasAcceptedToShareDetailsWithLanguageHouse: (newValue: boolean) => void
    isSelfRegistration?: boolean
}

export interface PermissionFieldsetModel {
    permission: boolean
}

const PermissionFieldset: React.FunctionComponent<Props> = props => {
    const { hasAcceptedToShareDetailsWithLanguageHouse, setHasAcceptedToShareDetailsWithLanguageHouse } = props
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Toestemmingen`)}>
            <Column spacing={4}>
                <Field label={' '} horizontal={true}>
                    <Row>
                        <Checkbox
                            checked={hasAcceptedToShareDetailsWithLanguageHouse}
                            name={'permission'}
                            defaultChecked={false}
                            onChange={onChangeHasAcceptedToShareDetailsWithLanguageHouse}
                            label={i18n._(
                                props.isSelfRegistration
                                    ? t`Ik geef toestemming de gegevens in dit formulier te delen met het Taalhuis`
                                    : t`De deelnemer heeft toestemming gegeven voor het doorgeven van de aanmeldgegevens aan het Taalhuis`
                            )}
                        />
                    </Row>
                </Field>
            </Column>
        </Section>
    )

    function onChangeHasAcceptedToShareDetailsWithLanguageHouse(e: ChangeEvent<HTMLInputElement>) {
        setHasAcceptedToShareDetailsWithLanguageHouse(e.currentTarget.checked)
    }
}

export default PermissionFieldset
