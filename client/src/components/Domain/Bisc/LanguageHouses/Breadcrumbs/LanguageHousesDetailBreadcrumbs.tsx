import React from 'react'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'

interface Props {
    organizationSlug?: string
}

const LanguageHousesDetailBreadcrumbs: React.FunctionComponent<Props> = props => {
    const { organizationSlug } = props

    return <Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc(organizationSlug).languageHouse.overview]} />
}

export default LanguageHousesDetailBreadcrumbs
