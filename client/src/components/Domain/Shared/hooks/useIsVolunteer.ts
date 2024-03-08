import { EmployeeRole } from 'graphql/v2/generated/graphql'
import { useEffect, useState } from 'react'
import { Forms } from 'utils/forms'
import { ProviderEmployeeFieldsetModel } from '../Fieldsets/ProviderEmployeeFieldset'

export function useIsVolunteer(defaultRole?: EmployeeRole | null) {
    const [isVolunteer, setIsVolunteer] = useState<boolean>(false)

    useEffect(() => {
        if (!isVolunteer && defaultRole === EmployeeRole.Volunteer) {
            setIsVolunteer(true)
        }
    }, [defaultRole, isVolunteer])

    function handleOnFormChange(e: React.FormEvent<HTMLFormElement>) {
        const formData = Forms.getFormDataFromFormEvent<ProviderEmployeeFieldsetModel>(e)

        if (formData && formData.role) {
            return setIsVolunteer(formData?.role === EmployeeRole.Volunteer)
        }
    }

    return { isVolunteer, handleOnFormChange }
}
