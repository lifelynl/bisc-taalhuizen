import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import React from 'react'

interface Props {
    languageHouseId: string
    languageHouseName: string
    organizationSlug?: string
}

const LanguageHouseCoworkersDetailBreadcrumbs: React.FunctionComponent<Props> = props => {
    const { languageHouseId, languageHouseName, organizationSlug } = props

    return (
        <Breadcrumbs
            breadcrumbItems={[
                breadcrumbItems.bisc(organizationSlug).languageHouse.overview,
                breadcrumbItems.bisc(organizationSlug).languageHouse.detail.index(languageHouseName, languageHouseId),
                breadcrumbItems.bisc(organizationSlug).languageHouse.employees.index(languageHouseId),
            ]}
        />
    )
}

export default LanguageHouseCoworkersDetailBreadcrumbs
