import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { ParticipationType, StudentsQuery, useEmployeeQuery, useStudentsLazyQuery } from 'graphql/v2/generated/graphql'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    LanguageHouseManagementCoworkerDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'

export const ManagementLanguageHouseEmployeeMenteesView: React.FunctionComponent = () => {
    const { languageHouseEmployeeId } = useParams<LanguageHouseManagementCoworkerDetailRouteParams>()
    const { i18n } = useLingui()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const employeeQuery = useEmployeeQuery({
        variables: {
            id: languageHouseEmployeeId,
        },
    })

    const [getStudents, { data, loading, error, fetchMore }] = useStudentsLazyQuery()

    useEffect(() => {
        if (employeeQuery.data?.employee.organization.id) {
            getStudents({
                variables: {
                    paginationArgs: { skip: 0, take: DEFAULT_INITIAL_PAGE_SIZE },
                    organizationId: employeeQuery.data?.employee.organization.id,
                    mentorEmployeeId: languageHouseEmployeeId,
                },
            })
        }
    }, [employeeQuery.data?.employee.organization.id, getStudents, languageHouseEmployeeId])

    if (employeeQuery.loading || loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    if (employeeQuery.error || error) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    const students = data?.students.nodes || []

    return (
        <InfiniteScroll
            hasMore={data?.students?.hasMore ?? false}
            loadMore={paginationArgs =>
                fetchMore({
                    variables: {
                        paginationArgs,
                    },
                })
            }
        >
            <Table
                flex={1}
                headers={[
                    { headerLabel: i18n._(`Achternaam`), field: 'familyName' },
                    { headerLabel: i18n._(`Roepnaam`), field: 'givenName' },
                    { headerLabel: i18n._(`Team`), field: 'teamName' },
                    { headerLabel: i18n._(`Aangemaakt`), field: 'createdAt' },
                    { headerLabel: i18n._(`Verwezen`), field: 'referredAt' },
                ]}
                rows={students.map(s => renderRow(s))}
                emptyMessage={i18n._(t`Er zijn nog geen deelnemers in begeleiding`)}
            />
        </InfiniteScroll>
    )

    function renderRow(student: StudentsQuery['students']['nodes'][0]) {
        const allParticipations = student.learningNeeds?.reduce<Pick<ParticipationType, 'createdAt'>[]>(
            (participations, learningNeed) => {
                if (learningNeed?.participations) {
                    return [...participations, ...learningNeed.participations]
                }

                return participations
            },
            []
        )

        const firstParticipation = allParticipations?.sort(
            (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        )[0] as ParticipationType

        return [
            <TableLink
                text={(student.person && NameFormatters.formattedLastName(student.person)) || '-'}
                to={languageHouseRoutes(organizationSlug).participants.detail(student.id).index}
            />,
            <Paragraph>{student.person?.givenName}</Paragraph>,
            <Paragraph>{student.team?.name}</Paragraph>,
            <Paragraph>{DateFormatters.formattedDate(student.person.createdAt)}</Paragraph>,
            <Paragraph>{DateFormatters.formattedDate(firstParticipation?.createdAt)}</Paragraph>,
        ]
    }
}
