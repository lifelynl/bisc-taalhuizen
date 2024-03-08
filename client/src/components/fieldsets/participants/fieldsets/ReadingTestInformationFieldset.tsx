import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { studentReadingTestResultEnumTranslations } from 'components/Domain/Participation/translations/translations'
import React from 'react'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { Select } from 'components/Core/DataEntry/Select'
import { Maybe, ReadingTestResult } from 'graphql/v2/generated/graphql'

interface Props {
    prefillData?: ReadingTestInformationPrefillData
    readOnly?: boolean
}

interface ReadingTestInformationPrefillData {
    'registration.readingTestResult'?: Maybe<ReadingTestResult>
}

export interface ReadingTestInformationFieldsetModel {
    'registration.readingTestResult'?: ReadingTestResult
}

const ReadingTestInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Leestest`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                        <Paragraph>
                            {
                                getStudentReadingTestResultEnumTranslations().find(
                                    option => option.value === prefillData?.['registration.readingTestResult']
                                )?.label
                            }
                        </Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Leestest`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Resultaat`)} horizontal={true}>
                    <Select
                        name="registration.readingTestResult"
                        placeholder={i18n._(t`Selecteer`)}
                        options={getStudentReadingTestResultEnumTranslations()}
                        defaultValue={
                            prefillData?.['registration.readingTestResult']
                                ? {
                                      value: prefillData?.['registration.readingTestResult'],
                                      label: studentReadingTestResultEnumTranslations[
                                          prefillData?.['registration.readingTestResult']
                                      ],
                                  }
                                : undefined
                        }
                    />
                </Field>
            </Column>
        </Section>
    )

    function getStudentReadingTestResultEnumTranslations() {
        return Object.values(ReadingTestResult).map(value => ({
            label: studentReadingTestResultEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value,
        }))
    }
}

export default ReadingTestInformationFieldset
