import Modal from 'components/Core/Modal/Modal'
import React, { useEffect, useRef, useState } from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'
import { GroupAddEmployeeModal } from '../Modals/GroupAddEmployeeModal'
import { bubbleToFormElement } from 'utils/events/events'
import { MutableItemsList } from 'components/Core/MutableItemsList/MutableItemsList'
import { MutableItem } from 'components/Core/MutableItemsList/MutableItem'
import { EmployeeType, PersonType } from 'graphql/v2/generated/graphql'
import { ComparisonInformation } from 'components/Core/Availability/AvailabilityComparison'

interface Props {
    inputName?: string
    organizationId: string
    defaultValue?: Array<EmployeeForFormInput>
    groupForAvailabilityComparison: ComparisonInformation
}

export type EmployeeForFormInput = Pick<EmployeeType, 'id'> & {
    person: Pick<PersonType, 'givenName' | 'familyName' | 'additionalName'>
}

export const GroupEmployeesInput: React.FunctionComponent<Props> = props => {
    const [selectedEmployees, setEmployees] = useState<Array<EmployeeForFormInput>>(props.defaultValue ?? [])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setEmployees(props.defaultValue ?? [])

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <MutableItemsList onAddItem={handleOnAddItem}>{renderItems()}</MutableItemsList>
            <Modal big={true} isOpen={isModalOpen}>
                <GroupAddEmployeeModal
                    selectedEmployeeIds={selectedEmployees.map(e => e.id)}
                    organizationId={props.organizationId}
                    onSubmit={handleOnAdd}
                    onClose={() => setIsModalOpen(false)}
                    groupForAvailabilityComparison={props.groupForAvailabilityComparison}
                />
            </Modal>
            <input
                ref={inputRef}
                hidden={true}
                readOnly={true}
                name={props.inputName}
                value={selectedEmployees.map(employee => employee.id).join(',')}
            />
        </>
    )

    function renderItems() {
        return selectedEmployees.map((employee, index, array) => (
            <MutableItem key={`${index}-${array.length}`} onDelete={() => handleOnDelete(employee)}>
                {NameFormatters.formattedFullname(employee.person)}
            </MutableItem>
        ))
    }

    function handleOnAddItem() {
        if (inputRef && inputRef.current) {
            bubbleToFormElement(inputRef)
        }

        setIsModalOpen(true)
    }

    function handleOnAdd(employeeToAdd: EmployeeForFormInput) {
        setEmployees([...selectedEmployees, employeeToAdd])
    }

    function handleOnDelete(employeeToDelete: EmployeeForFormInput) {
        const newEmployees = selectedEmployees.filter(employee => employee.id !== employeeToDelete.id)

        setEmployees(newEmployees)
    }
}
