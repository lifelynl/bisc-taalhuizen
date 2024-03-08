import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { CheckboxColor } from '../../../Core/DataEntry/Checkbox'
import { SectionTitleWithBorder } from '../../../Core/Field/SectionTitleWithBorder'
import Label from '../../../Core/Label/Label'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'
import { FontWeight, PermissionContainer } from '../../../Core/PermissionContainer/PermissionContainer'
import { ConnectedFieldsetProps } from '../../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../../hooks/fieldsets/useFieldsetContent'

interface Props extends ConnectedFieldsetProps<Fields> {
    readOnly?: boolean
    prefillData?: ProviderPermissionsFieldsetPrefillData
}
export interface ProviderPermissionsFieldsetFormModel {
    'person.didSignPermissionForm'?: 'on'
    'person.hasPermissionToShareDataWithProviders'?: 'on'
    'person.hasPermissionToShareDataWithLibraries'?: 'on'
    'person.hasPermissionToSendInformationAboutLibraries'?: 'on'
}

interface ProviderPermissionsFieldsetPrefillData {
    'person.didSignPermissionForm'?: boolean
    'person.hasPermissionToSendInformationAboutLibraries'?: boolean
}

type Fields = 'didSignPermissionForm' | 'hasPermissionToSendInformationAboutLibraries'

export const ProviderPermissionsFieldset: React.FC<Props> = props => {
    const { readOnly, prefillData, fieldNaming } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Toestemmingen`),
            didSignPermissionForm: {
                label: i18n._(t`Het toestemmingsformulier is getekend.`),
            },
            hasPermissionToSendInformationAboutLibraries: {
                label: i18n._(t`Deelnemer geeft toestemming voor het toesturen van informatie van Bibliotheek.`),
            },
        },
        fieldNaming
    )

    if (readOnly) {
        return (
            <>
                <SectionTitleWithBorder title={content.title} />
                <Column spacing={8}>
                    <Row>
                        <PermissionContainer
                            readOnly={readOnly}
                            text={content.didSignPermissionForm?.label}
                            fontWeight={FontWeight.bold}
                            defaultChecked={!!prefillData?.['person.didSignPermissionForm']}
                        />
                    </Row>
                    <Column spacing={2}>
                        <Label text={i18n._(t`Het formulier bevat de volgende toestemmingen`)} />
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text={content.hasPermissionToSendInformationAboutLibraries?.label}
                                fontWeight={FontWeight.normal}
                                defaultChecked={!!prefillData?.['person.hasPermissionToSendInformationAboutLibraries']}
                            />
                        </Row>
                    </Column>
                </Column>
            </>
        )
    }
    return (
        <Column spacing={10}>
            <SectionTitleWithBorder title={i18n._(t`Toestemmingen`)} />
            <Column spacing={4}>
                <Row>
                    <PermissionContainer
                        checkboxColor={CheckboxColor.green}
                        name={'person.didSignPermissionForm'}
                        text={content.didSignPermissionForm?.label}
                        fontWeight={FontWeight.bold}
                        defaultChecked={!!prefillData?.['person.didSignPermissionForm']}
                    />
                </Row>
                <Column spacing={2}>
                    <Label text={i18n._(t`Het formulier bevat de volgende toestemmingen`)} />
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'person.hasPermissionToSendInformationAboutLibraries'}
                            text={content.hasPermissionToSendInformationAboutLibraries?.label}
                            fontWeight={FontWeight.normal}
                            defaultChecked={!!prefillData?.['person.hasPermissionToSendInformationAboutLibraries']}
                        />
                    </Row>
                </Column>
            </Column>
        </Column>
    )
}
