import { BiscProviderFieldsetModel } from 'components/Domain/Bisc/Provider/BiscProviderFieldset'
import { OrganizationTypeEnum } from 'graphql/v2/generated/graphql'
import { Forms } from 'utils/forms'

export function getMappedProviderFormFields(formData: BiscProviderFieldsetModel) {
    const address = {
        street: formData['address.street'] ?? '',
        houseNumber: formData['address.houseNumber'] ?? '',
        houseNumberSuffix: formData['address.houseNumberSuffix'] ?? '',
        postalCode: formData['address.postalCode'] ?? '',
        locality: formData['address.locality'] ?? '',
        country: 'NL',
        name: formData?.name ?? '',
    }

    return {
        type: OrganizationTypeEnum.Provider,
        name: formData.name ?? '',
        address,
        telephone: formData?.telephone ?? '',
        email: formData?.email ?? '',
        hasLimitedEditRights: Forms.getBooleanValueByCheckboxValue(formData?.hasLimitedEditRights),
    }
}

export function getMappedUpdateProviderFormFields(formData: BiscProviderFieldsetModel) {
    const address = {
        street: formData['address.street'] ?? '',
        houseNumber: formData['address.houseNumber'] ?? '',
        houseNumberSuffix: formData['address.houseNumberSuffix'] ?? '',
        postalCode: formData['address.postalCode'] ?? '',
        locality: formData['address.locality'] ?? '',
        country: 'NL',
        name: formData.name ?? '',
    }

    return {
        name: formData.name ?? '',
        address,
        telephone: formData.telephone ?? '',
        email: formData.email ?? '',
        hasLimitedEditRights: Forms.getBooleanValueByCheckboxValue(formData?.hasLimitedEditRights),
    }
}
