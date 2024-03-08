import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'

import { BiscCoworkersInformationFieldset } from 'components/fieldsets/bisc/BiscCoworkersInformationFieldset'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { EmployeeQuery, useEmployeeQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BiscManagementCoworkerDetailRouteParams, biscRoutes } from 'routes/bisc/biscRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {}

export const ManagementBiscEmployeesDetailDataView: React.FunctionComponent<Props> = () => {
    const { biscEmployeeId } = useParams<BiscManagementCoworkerDetailRouteParams>()
    const { data, loading, error } = useEmployeeQuery({
        variables: {
            id: biscEmployeeId,
        },
    })
    const history = useHistory()
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPage}
        </PageQuery>
    )

    function renderPage(employeeObject: EmployeeQuery) {
        const { employee } = employeeObject
        return (
            <>
                <Headline
                    title={i18n._(t`Medewerker ${NameFormatters.formattedFullname(employee.person)}`)}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.bisc(organizationName).management.overview,
                                breadcrumbItems.bisc(organizationName).management.employees,
                            ]}
                        />
                    }
                />
                {renderSection(employeeObject)}
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Button
                            type={ButtonType.primary}
                            onClick={() =>
                                history.push(
                                    biscRoutes(organizationName).management.coworkers.detail(biscEmployeeId).data.update
                                )
                            }
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    }
                />
            </>
        )
    }

    function renderSection(employeeObject: EmployeeQuery) {
        const {
            employee: { person },
        } = employeeObject

        return (
            <BiscCoworkersInformationFieldset
                readOnly={true}
                prefillData={{
                    'person.givenName': person.givenName,
                    'person.additionalName': person.additionalName,
                    'person.familyName': person.familyName,
                    'person.email': person.email,
                    'person.telephone': person.telephone,
                }}
            />
        )
    }
}
