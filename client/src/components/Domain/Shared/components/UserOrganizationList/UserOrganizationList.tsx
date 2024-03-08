import React, { useContext } from 'react'
import styles from './UserOrganizationList.module.scss'
import Button, { ButtonType } from 'components/Core/Button/Button'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { IconType } from 'components/Core/Icon/IconType'
import { OrganizationType, OrganizationTypeEnum } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import Column from 'components/Core/Layout/Column/Column'

type Organization = Pick<OrganizationType, 'id' | 'name' | 'slug' | 'type'>

interface Props {
    handleClick: (slug: string, type: OrganizationTypeEnum) => void
}

const UserOrganizationList: React.FunctionComponent<Props> = ({ handleClick }) => {
    const { loggedInUser, user } = useContext(SessionContext)

    const groupedEmployees: Partial<Record<OrganizationTypeEnum, Organization[]>> = {}

    const employees = loggedInUser?.employees || user?.person?.employees
    employees?.forEach(e => {
        if (e.organization.id === user?.currentEmployee?.organization.id) {
            // exclude current organization from the list
            return
        }

        if (!groupedEmployees[e.organization.type]) {
            groupedEmployees[e.organization.type] = []
        }

        groupedEmployees[e.organization.type]!.push(e.organization)
    })

    const translatedOrganizationTypes = {
        [OrganizationTypeEnum.Bisc]: 'BiSC',
        [OrganizationTypeEnum.LanguageHouse]: 'Taalhuis',
        [OrganizationTypeEnum.Provider]: 'Aanbieder',
    }

    if (Object.keys(groupedEmployees).length === 1) {
        return <>{Object.values(groupedEmployees)[0].map(renderOrganization)}</>
    }

    const groups = Object.entries(groupedEmployees)

    return (
        <Column spacing={1}>
            {groups.map(([type, organizations], i) => (
                <div key={type}>
                    <SectionTitle title={translatedOrganizationTypes[type as OrganizationTypeEnum]} heading={'H4'} />
                    <HorizontalRule short={true} />
                    <Column spacing={4}>{organizations.map(renderOrganization)}</Column>
                    {i + 1 < groups.length && <HorizontalRule className={styles.lineSpacing} />}
                </div>
            ))}
        </Column>
    )

    function renderOrganization(organization: Organization) {
        return (
            <div key={organization.id}>
                <Button
                    className={styles.button}
                    icon={IconType.arrowRight}
                    type={ButtonType.arrowLink}
                    onClick={() => handleClick(organization.slug, organization.type)}
                >
                    {organization.name}
                </Button>
            </div>
        )
    }
}

export default UserOrganizationList
