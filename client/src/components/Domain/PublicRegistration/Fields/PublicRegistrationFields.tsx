import React from 'react'
import SectionTitle from 'components/Core/Text/SectionTitle'
import styles from './PublicRegistrationFields.module.scss'
import {
    RegistratorInformationFieldset,
    RegistratorInformationFieldsetModel,
} from './Fieldsets/RegistratorInformationFieldset'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import LanguageHouseFieldset, { LanguageHouseFieldsetModel } from './Fieldsets/LanguageHouseFieldset'
import {
    PersonInformationFieldset,
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'
import {
    ContactInformationFieldset,
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import ExplanationInformationFieldset, {
    ExplanationInformationFieldsetModel,
} from 'components/fieldsets/shared/ExplanationInformationFieldset'
import PermissionFieldset, { PermissionFieldsetModel } from './Fieldsets/PermissionFieldset'

interface Props {
    hasAcceptedToShareDetailsWithLanguageHouse: boolean
    setHasAcceptedToShareDetailsWithLanguageHouse: (newValue: boolean) => void
    isSelfRegistration?: boolean
}

export interface PublicRegistrationFieldsFormModel
    extends RegistratorInformationFieldsetModel,
        LanguageHouseFieldsetModel,
        PersonInformationFieldsetModel,
        ContactInformationFieldsetFormModel,
        ExplanationInformationFieldsetModel,
        PermissionFieldsetModel {}

export const PublicRegistrationFields: React.FC<Props> = props => {
    const {
        hasAcceptedToShareDetailsWithLanguageHouse,
        setHasAcceptedToShareDetailsWithLanguageHouse,
        isSelfRegistration = false,
    } = props
    const { i18n } = useLingui()

    return (
        <div className={styles.container}>
            {!isSelfRegistration && (
                <>
                    <SectionTitle heading={'H3'} title={i18n._(t`Aanmelder`)} className={styles.sectionTitle} />
                    <RegistratorInformationFieldset />
                    <HorizontalRule />
                </>
            )}
            <SectionTitle
                heading={'H3'}
                title={i18n._(isSelfRegistration ? t`Uw gegevens` : t`Deelnemer`)}
                className={styles.sectionTitle}
            />
            <PersonInformationFieldset
                fieldControls={{
                    gender: {
                        hidden: true,
                    },
                    birthday: {
                        hidden: true,
                    },
                    birthplace: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                fieldControls={{
                    telephone: {
                        required: true,
                    },
                    email: {
                        required: !isSelfRegistration,
                    },
                    postalCode: {
                        hidden: true,
                    },
                    emergencyTelephone: {
                        hidden: true,
                    },
                    address: {
                        hidden: true,
                    },
                    contactPreference: {
                        hidden: true,
                    },
                    locality: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                fieldControls={{
                    address: { required: true },
                    postalCode: { required: true },
                    locality: { required: true },
                    emergencyTelephone: {
                        hidden: true,
                    },
                    telephone: {
                        hidden: true,
                    },
                    email: {
                        hidden: true,
                    },
                    contactPreference: {
                        hidden: true,
                    },
                }}
                fieldNaming={{
                    title: i18n._(t`Adres`),
                }}
            />
            <HorizontalRule />
            <ExplanationInformationFieldset />
            <HorizontalRule />
            <SectionTitle heading={'H3'} title={i18n._(t`Taalhuis`)} className={styles.sectionTitle} />
            <LanguageHouseFieldset isSelfRegistration={isSelfRegistration} />
            <HorizontalRule />
            <PermissionFieldset
                hasAcceptedToShareDetailsWithLanguageHouse={hasAcceptedToShareDetailsWithLanguageHouse}
                setHasAcceptedToShareDetailsWithLanguageHouse={setHasAcceptedToShareDetailsWithLanguageHouse}
                isSelfRegistration={isSelfRegistration}
            />
        </div>
    )
}
