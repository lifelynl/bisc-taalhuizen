import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { AvailabilityComparison, ComparisonInformation } from 'components/Core/Availability/AvailabilityComparison'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'
import { useEmployeeQuery } from 'graphql/v2/generated/graphql'
import React from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    groupForAvailabilityComparison: ComparisonInformation
    selectedProviderEmployeeId: string
}

export const GroupEmployeeDetailModalSectionView: React.FunctionComponent<Props> = props => {
    const { selectedProviderEmployeeId, groupForAvailabilityComparison } = props
    const { i18n } = useLingui()

    const employeeQuery = useEmployeeQuery({
        variables: {
            id: selectedProviderEmployeeId,
        },
    })

    if (employeeQuery.loading) {
        return (
            <Center>
                <Spinner type={SpinnerAnimation.simpleSpinner} />
            </Center>
        )
    }

    if (employeeQuery.error || !employeeQuery.data || !selectedProviderEmployeeId) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    const employee = employeeQuery.data.employee

    return (
        <>
            <InformationFieldset
                readOnly={true}
                prefillData={{
                    familyName: employee.person.familyName,
                    additionalName: employee.person.additionalName,
                    phonenumber: employee.person.telephone,
                    callSign: employee.person.givenName,
                }}
            />
            <HorizontalRule />
            <Section title={i18n._(t`Beschikbaarheid`)} useFullWidthContent={true}>
                <AvailabilityComparison
                    leftHandComparisonInformation={{
                        role: i18n._(t`Begeleider`),
                        title: NameFormatters.formattedFullname(employee.person),
                        availability: employee.person.availability ?? [],
                        availabilityNotes: employee.person.availabilityNotes ?? '',
                    }}
                    rightHandComparisonInformation={groupForAvailabilityComparison}
                />
            </Section>
        </>
    )
}
