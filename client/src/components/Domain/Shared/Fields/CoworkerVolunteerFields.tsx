import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Space from 'components/Core/Layout/Space/Space'
import SectionTitle from 'components/Core/Text/SectionTitle'
import {
    ContactInformationFieldset,
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import {
    CourseInformationFieldset,
    CourseInformationFieldsetModel,
    CourseInformationFieldsetPrefillData,
} from 'components/fieldsets/shared/CourseInformationFieldset'
import EmployeeEducationInformationFieldset, {
    EmployeeEducationInformationFieldsetData,
    EmployeeEducationInformationFieldsetModel,
} from 'components/fieldsets/shared/EmployeeEducationInformationFieldset'
import { MentorshipInformationFieldset } from 'components/fieldsets/shared/MentorshipInformationFieldset'
import {
    PersonInformationFieldset,
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'
import React from 'react'

interface Props {
    readOnly?: boolean
    prefillData?: Data
    courseSubtitle?: string
    showOtherCertificates?: boolean
    customFieldText?: string
}

export type CoworkerVolunteerFieldsModel = PersonInformationFieldsetModel &
    ContactInformationFieldsetFormModel &
    EmployeeEducationInformationFieldsetModel &
    CourseInformationFieldsetModel

type Data = PersonInformationFieldsetModel &
    ContactInformationFieldsetFormModel &
    EmployeeEducationInformationFieldsetData &
    CourseInformationFieldsetPrefillData

export const CoworkerVolunteerFields: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const { readOnly, prefillData, courseSubtitle, showOtherCertificates, customFieldText } = props

    return (
        <>
            <SectionTitle title={i18n._(t`Vrijwilliger gegevens`)} heading="H3" />
            <Space pushTop={true} />
            <PersonInformationFieldset
                readOnly={readOnly}
                prefillData={prefillData}
                fieldControls={{
                    familyName: {
                        hidden: true,
                    },
                    additionalName: {
                        hidden: true,
                    },
                    givenName: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                readOnly={readOnly}
                prefillData={prefillData}
                fieldControls={{
                    email: {
                        hidden: true,
                    },
                    telephone: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <MentorshipInformationFieldset readOnly={readOnly} prefillData={prefillData} />
            <HorizontalRule />
            <EmployeeEducationInformationFieldset readOnly={readOnly} prefillData={prefillData} />
            <HorizontalRule />
            <CourseInformationFieldset
                subtitle={courseSubtitle}
                showOtherCertificate={showOtherCertificates}
                readOnly={readOnly}
                prefillData={prefillData}
                customFieldText={customFieldText}
            />
        </>
    )
}
