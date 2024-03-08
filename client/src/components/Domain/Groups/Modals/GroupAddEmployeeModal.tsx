import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ComparisonInformation } from 'components/Core/Availability/AvailabilityComparison'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import { ModalViewBig } from 'components/Core/Modal/ModalViewBig'
import { useOrganizationEmployeesQuery } from 'graphql/v2/generated/graphql'
import React, { useState } from 'react'
import { EmployeeForFormInput } from '../Fieldset/GroupEmployeesInput'
import { GroupEmployeeDetailModalSectionView } from './GroupEmployeeDetailModalSectionView'
import { MentorEmployeesList } from 'components/Domain/Shared/components/MentorEmployeesList/MentorEmployeesList'

interface Props {
    selectedEmployeeIds: string[]
    organizationId: string
    onClose: () => void
    onSubmit: (data: EmployeeForFormInput) => void
    groupForAvailabilityComparison: ComparisonInformation
}

export const GroupAddEmployeeModal: React.FunctionComponent<Props> = props => {
    const { onClose, onSubmit, groupForAvailabilityComparison, organizationId, selectedEmployeeIds } = props
    const { i18n } = useLingui()

    const [selectedProviderEmployee, setSelectedProviderEmployee] = useState<EmployeeForFormInput | null>(null)

    const variables = { paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE }, organizationId }
    const listQuery = useOrganizationEmployeesQuery({
        variables,
    })

    return (
        <ModalViewBig
            title={i18n._(t`Begeleider toevoegen`)}
            onClose={onClose}
            ContentComponent={renderContent()}
            BottomComponent={renderBottomComponent()}
        />
    )

    function renderContent() {
        if (!selectedProviderEmployee) {
            return renderList()
        }

        return (
            <GroupEmployeeDetailModalSectionView
                selectedProviderEmployeeId={selectedProviderEmployee.id}
                groupForAvailabilityComparison={groupForAvailabilityComparison}
            />
        )
    }
    function renderList() {
        if (listQuery.loading) {
            return (
                <Center>
                    <Spinner type={SpinnerAnimation.simpleSpinner} />
                </Center>
            )
        }

        if (listQuery.error || !listQuery.data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        const selectableEmployees = listQuery.data.organizationEmployees.nodes.filter(
            e => !selectedEmployeeIds.includes(e.id)
        )

        return (
            <InfiniteScroll
                hasMore={listQuery.data?.organizationEmployees.hasMore ?? false}
                loadMore={paginationArgs => listQuery.fetchMore({ variables: { ...variables, paginationArgs } })}
            >
                <MentorEmployeesList
                    onAddMentor={item => handleOnAddMentor(item)}
                    onView={item => setSelectedProviderEmployee(item)}
                    employees={selectableEmployees}
                    showIconsColumns={true}
                />
            </InfiniteScroll>
        )
    }

    function renderBottomComponent() {
        if (!selectedProviderEmployee) {
            return undefined // undefined because check is already done in modalView and ts did not like null
        }

        return (
            <Row justifyContent={'space-between'} grow={true}>
                <Button
                    icon={IconType.arrowLeft}
                    type={ButtonType.secondary}
                    onClick={() => setSelectedProviderEmployee(null)}
                >
                    {i18n._(t`Terug naar begeleidersoverzicht`)}
                </Button>
                <Row spacing={1}>
                    <Button type={ButtonType.secondary} onClick={() => onClose()}>
                        {i18n._(t`Annuleren`)}
                    </Button>

                    <Button type={ButtonType.primary} onClick={() => handleOnAddMentor(selectedProviderEmployee)}>
                        {i18n._(t`Begeleider toevoegen`)}
                    </Button>
                </Row>
            </Row>
        )
    }

    function handleOnAddMentor(item: EmployeeForFormInput) {
        onSubmit(item)
        onClose()
    }
}
