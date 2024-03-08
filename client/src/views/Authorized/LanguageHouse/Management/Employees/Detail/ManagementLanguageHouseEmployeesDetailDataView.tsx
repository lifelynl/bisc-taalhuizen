import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import LanguageHouseCoworkersInformationFieldset from 'components/fieldsets/languageHouse/LanguageHouseCoworkersInformationFieldset'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { EmployeeQuery, EmployeeRole, useEmployeeQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseManagementCoworkerDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'

interface Props {}

export const ManagementLanguageHouseEmployeesDetailDataView: React.FunctionComponent<Props> = () => {
    const { languageHouseEmployeeId } = useParams<LanguageHouseManagementCoworkerDetailRouteParams>()

    const sessionContext = useContext(SessionContext)
    const { data, loading, error } = useEmployeeQuery({
        variables: {
            id: languageHouseEmployeeId,
        },
    })

    const history = useHistory()
    const { i18n } = useLingui()

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPage}
        </PageQuery>
    )

    function renderPage(employee: EmployeeQuery) {
        return (
            <>
                {renderSection(employee)}
                <Space pushTop={true} />
                {/* //TODO change it when we will know how to match UserScope to EmployeeRole */}
                {sessionContext.user?.currentEmployee?.role === EmployeeRole.Coordinator && (
                    <Actionbar
                        RightComponent={
                            <Button
                                type={ButtonType.primary}
                                onClick={() =>
                                    history.push(
                                        languageHouseRoutes(
                                            sessionContext.organizationSlug
                                        ).management.coworkers.detail(languageHouseEmployeeId).data.update
                                    )
                                }
                            >
                                {i18n._(t`Bewerken`)}
                            </Button>
                        }
                    />
                )}
            </>
        )
    }

    function renderSection(employeeObject: EmployeeQuery) {
        const { person, role, createdAt, updatedAt, teams } = employeeObject.employee

        return (
            <LanguageHouseCoworkersInformationFieldset
                readOnly={true}
                showTeams={true}
                prefillData={{
                    'person.givenName': person.givenName,
                    'person.additionalName': person.additionalName,
                    'person.familyName': person.familyName,
                    'person.email': person.email,
                    'person.telephone': person.telephone,
                    role,
                    createdAt,
                    updatedAt,
                    teams,
                }}
            />
        )
    }
}
