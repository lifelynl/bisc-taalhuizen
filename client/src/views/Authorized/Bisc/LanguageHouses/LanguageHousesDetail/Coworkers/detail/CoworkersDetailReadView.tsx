import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import LanguageHouseCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/LanguageHouses/Breadcrumbs/LanguageHouseCoworkersDetailBreadcrumbs'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import LanguageHouseCoworkersInformationFieldset from 'components/fieldsets/languageHouse/LanguageHouseCoworkersInformationFieldset'
import { EmployeeQuery, EmployeeRole, OrganizationType, useEmployeeQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BiscLanguageHousesDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    organization: OrganizationType
}

const CoworkersDetailReadView: React.FunctionComponent<Props> = props => {
    const { organization } = props
    const { languageHouseId, languageHouseEmployeeId } = useParams<BiscLanguageHousesDetailCoworkersDetailRouteParams>()
    const { data, loading, error } = useEmployeeQuery({
        variables: {
            id: languageHouseEmployeeId,
        },
    })
    const { i18n } = useLingui()
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPage}
        </PageQuery>
    )

    function renderPage(data: EmployeeQuery) {
        const { employee } = data
        return (
            <>
                <Headline
                    title={i18n._(t`Medewerker ${NameFormatters.formattedFullname(employee.person)}`)}
                    TopComponent={
                        <LanguageHouseCoworkersDetailBreadcrumbs
                            languageHouseId={languageHouseId}
                            languageHouseName={organization.name}
                            organizationSlug={organizationName}
                        />
                    }
                />
                {renderSection(data)}
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Button
                            type={ButtonType.primary}
                            onClick={() =>
                                history.push(
                                    routes.authorized
                                        .bisc(organizationName)
                                        .languageHouses.detail(languageHouseId)
                                        .coworkers.detail(languageHouseEmployeeId).data.update
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

    function renderSection(data: EmployeeQuery) {
        const person = data.employee.person

        return (
            <LanguageHouseCoworkersInformationFieldset
                readOnly={true}
                prefillData={{
                    'person.givenName': person.givenName,
                    'person.additionalName': person.additionalName,
                    'person.familyName': person.familyName,
                    'person.email': person.email,
                    'person.telephone': person.telephone,
                    role: data.employee.role as EmployeeRole,
                    createdAt: data.employee.createdAt,
                    updatedAt: data.employee.updatedAt,
                }}
            />
        )
    }
}

export default CoworkersDetailReadView
