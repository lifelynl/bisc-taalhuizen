import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import DateInput from '../../Core/DataEntry/DateInput'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import ControlField from '../../Core/Field/ControlField'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'
import { ConnectedFieldsetProps } from '../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: PersonInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface PersonInformationFieldsetModel {
    lastName?: string
    insertion?: string
    nickName?: string
    gender?: string
    dateOfBirth?: string
    countryOfOrigin?: string
}

export interface PersonInformationFieldsetPrefillData {
    lastName?: string | null
    insertion?: string | null
    nickName?: string | null
    gender?: string | null
    dateOfBirth?: string | null
    countryOfOrigin?: string | null
}

export enum Roles {
    coordinator = 'coordinator',
    mentor = 'mentor',
    volunteer = 'volunteer',
}

type Fields = 'lastName' | 'insertion' | 'nickName' | 'gender' | 'dateOfBirth' | 'gender' | 'countryOfOrigin'

const PersonInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Persoonsgegevens`),
            lastName: {
                label: i18n._(t`Achternaam`),
                placeholder: i18n._(t`Achternaam`),
            },
            insertion: {
                label: i18n._(t`Tussenvoegsel`),
                placeholder: i18n._(t`Tussenvoegsel`),
            },
            nickName: {
                label: i18n._(t`Roepnaam`),
                placeholder: i18n._(t`Roepnaam`),
            },
            gender: {
                label: i18n._(t`Geslacht`),
                placeholder: i18n._(t`Geslacht`),
            },
            dateOfBirth: {
                label: i18n._(t`Geboortedatum`),
                placeholder: i18n._(t`Geboortedatum`),
            },
            countryOfOrigin: {
                label: i18n._(t`Land van herkomst`),
                placeholder: i18n._(t`Land`),
            },
        },
        fieldNaming
    )

    const controls = useFieldsetControl<Fields>(
        {
            insertion: {
                required: true,
            },
            lastName: {
                validators: [GenericValidators.required],
                required: true,
            },
            nickName: {
                validators: [GenericValidators.required],
                required: true,
            },
            gender: {},
            dateOfBirth: {},
            countryOfOrigin: {
                validators: [GenericValidators.required],
                required: true,
            },
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls.lastName} label={content.lastName?.label} horizontal={true}>
                        <p>{`${prefillData?.lastName}, ${prefillData?.insertion}`}</p>
                    </ControlField>

                    <ControlField control={controls.nickName} label={content.nickName?.label} horizontal={true}>
                        <p>{prefillData?.nickName}</p>
                    </ControlField>

                    <ControlField control={controls.gender} label={content.gender?.label} horizontal={true}>
                        <p>{prefillData?.gender}</p>
                    </ControlField>

                    <ControlField control={controls.dateOfBirth} label={content.dateOfBirth?.label} horizontal={true}>
                        <p>{prefillData?.dateOfBirth}</p>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Persoonsgegevens`)}>
            <Column spacing={4}>
                <ControlField control={controls.lastName} label={content.lastName?.label} horizontal={true}>
                    <Input
                        name="lastName"
                        placeholder={content.lastName?.placeholder}
                        defaultValue={prefillData?.lastName ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.insertion} label={content?.insertion?.label} horizontal={true}>
                    <Input
                        name="insertion"
                        placeholder={content.insertion?.placeholder}
                        defaultValue={prefillData?.insertion ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.nickName} label={content?.nickName?.label} horizontal={true}>
                    <Input
                        name="nickName"
                        placeholder={content.nickName?.placeholder}
                        defaultValue={prefillData?.nickName ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.gender} label={content?.gender?.label} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'gender'} value="male" />
                            <p>{i18n._(t`Man`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'gender'} value="female" />
                            <p>{i18n._(t`Vrouw`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'gender'} value="x" />
                            <p>{i18n._(t`X`)}</p>
                        </Row>
                    </Column>
                </ControlField>

                <ControlField control={controls.dateOfBirth} label={content.dateOfBirth?.label} horizontal={true}>
                    <DateInput name="dateOfBirth" placeholder={content.dateOfBirth?.placeholder} />
                </ControlField>

                <ControlField
                    control={controls.countryOfOrigin}
                    label={content.countryOfOrigin?.label}
                    horizontal={true}
                >
                    <Input
                        name="country"
                        placeholder={i18n._(t`Land`)}
                        defaultValue={prefillData?.countryOfOrigin ?? undefined}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}

export default PersonInformationFieldset
