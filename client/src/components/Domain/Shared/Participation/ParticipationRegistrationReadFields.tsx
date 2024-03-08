import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IntakeRemarksReadonlyFieldset } from 'components/fieldsets/participants/fieldsets/IntakeRemarksReadonlyFieldset'
import { ReferringOrganizationReadonlyFieldset } from 'components/fieldsets/participants/fieldsets/ReferringOrganizationReadonlyFieldset'
import { StudentType } from 'graphql/v2/generated/graphql'

interface Props {
    student: Partial<StudentType>
}

export const ParticipationRegistrationReadFields: React.FunctionComponent<Props> = props => {
    const { student } = props

    return (
        <>
            <ReferringOrganizationReadonlyFieldset
                prefillData={{
                    'person.createdAt': student?.person?.createdAt,
                    'registration.selfRegistered': student.registration?.selfRegistered,
                    'registration.referringOrganizationOther': student.registration?.referringOrganizationOther,
                    'registration.referringTeam': student.registration?.referringTeam,
                    'registration.referringPerson.givenName': student?.registration?.referringPerson?.givenName,
                    'registration.referringPerson.additionalName':
                        student?.registration?.referringPerson?.additionalName,
                    'registration.referringPerson.familyName': student?.registration?.referringPerson?.familyName,
                    'registration.referringPerson.email': student?.registration?.referringPerson?.email,
                    'registration.referringPerson.telephone': student?.registration?.referringPerson?.telephone,
                }}
            />
            <HorizontalRule />
            <IntakeRemarksReadonlyFieldset
                prefillData={{
                    'registration.remarks': student?.registration?.remarks,
                }}
            />
        </>
    )
}
