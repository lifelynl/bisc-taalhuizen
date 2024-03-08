import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ComparisonInformation } from 'components/Core/Availability/AvailabilityComparison'
import Input from 'components/Core/DataEntry/Input'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Link from 'components/Core/Link/Link'
import Paragraph from 'components/Core/Typography/Paragraph'
import { EducationGroupType, Maybe } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { RecursivePartialMaybe } from 'utils/objects/objects'
import { EmployeeForFormInput, GroupEmployeesInput } from './GroupEmployeesInput'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {
    organizationId?: string
    prefillData?: Data
    readOnly?: boolean
    informationForAvailabilityComparison: ComparisonInformation // for when adding employees -> preview employee screen
}

export type GeneralGroupInformationFieldsetFormModel = RecursivePartialMaybe<
    Omit<Data, 'maximumParticipants' | 'minimumParticipants' | 'employees'> & {
        maximumParticipants: string
        minimumParticipants: string
        employeeIds: string
    }
>
type Data = Pick<
    EducationGroupType,
    | 'location'
    | 'maximumParticipants'
    | 'minimumParticipants'
    | 'evaluation'
    | 'availability'
    | 'availabilityNotes'
    | 'name'
> & {
    employees?: Maybe<Array<EmployeeForFormInput>>
}

export const GeneralGroupInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, organizationId, informationForAvailabilityComparison } = props
    const { i18n } = useLingui()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    if (readOnly) {
        return (
            <Section title={i18n._(t`Algemeen`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Locatie`)} horizontal={true}>
                        <Paragraph>{prefillData?.location}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Minimum deelnemers`)} horizontal={true}>
                        <Paragraph>{prefillData?.minimumParticipants}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Maximum deelnemers`)} horizontal={true}>
                        <Paragraph>{prefillData?.maximumParticipants}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Evaluatie`)} horizontal={true}>
                        <Paragraph>{prefillData?.evaluation}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Begeleiders`)} horizontal={true}>
                        {prefillData?.employees?.map((employee, index, array) => (
                            <Link
                                key={`${index}-${array.length}`}
                                to={providerRoutes(organizationSlug).management.coworkers.detail(employee.id).index}
                            >
                                <Icon type={IconType.profile} />
                                {NameFormatters.formattedFullname(employee.person)}
                            </Link>
                        ))}
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Algemeen`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Locatie`)} horizontal={true} required={true}>
                    <Input name="location" placeholder={i18n._(t`Locatie`)} defaultValue={prefillData?.location} />
                </Field>
                <Field label={i18n._(t`Minimum deelnemers`)} horizontal={true}>
                    <Input
                        name="minimumParticipants"
                        placeholder={i18n._(t`Minimum`)}
                        defaultValue={prefillData?.minimumParticipants ?? ''}
                        type="number"
                    />
                </Field>
                <Field label={i18n._(t`Maximum deelnemers`)} horizontal={true}>
                    <Input
                        name="maximumParticipants"
                        placeholder={i18n._(t`Maximum`)}
                        defaultValue={prefillData?.maximumParticipants ?? ''}
                        type="number"
                    />
                </Field>
                <Field label={i18n._(t`Evaluatie`)} horizontal={true}>
                    <TextArea
                        name="evaluation"
                        placeholder={i18n._(t`Evaluatie`)}
                        defaultValue={prefillData?.evaluation ?? ''}
                    />
                </Field>
                {organizationId && (
                    <Field label={i18n._(t`Begeleiders`)} horizontal={true}>
                        <GroupEmployeesInput
                            inputName="employeeIds"
                            organizationId={organizationId}
                            defaultValue={prefillData?.employees ?? []}
                            groupForAvailabilityComparison={informationForAvailabilityComparison}
                        />
                    </Field>
                )}
            </Column>
        </Section>
    )
}
