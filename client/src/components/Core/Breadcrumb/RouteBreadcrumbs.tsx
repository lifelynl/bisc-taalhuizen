import React from 'react'
import Breadcrumb from './Breadcrumb'
import Breadcrumbs from './Breadcrumbs'

interface BreadcrumbProps {
    label: string
    to: string
}
interface Props {
    className?: string
    breadcrumbs: BreadcrumbProps[]
}

const RouteBreadcrumbs: React.FunctionComponent<Props> = props => {
    const { className, breadcrumbs } = props

    return (
        <Breadcrumbs className={className}>
            {breadcrumbs.map(breadcrumb => (
                <Breadcrumb text={breadcrumb.label} to={breadcrumb.to} />
            ))}
        </Breadcrumbs>
    )
}

export default RouteBreadcrumbs
