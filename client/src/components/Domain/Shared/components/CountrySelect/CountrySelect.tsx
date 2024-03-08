import { DefaultSelectOption, Select, Props as SelectProps } from 'components/Core/DataEntry/Select'
import * as countries from 'i18n-iso-countries'
const translationsForDutchCountries = require('i18n-iso-countries/langs/nl.json')

countries.registerLocale(translationsForDutchCountries)

const countriesObject = countries.getNames('nl', { select: 'official' })

const countryOptions: DefaultSelectOption[] = Object.keys(countriesObject).map(countryCode => {
    return {
        value: countryCode,
        label: countriesObject[countryCode],
    }
})

interface Props<Option extends DefaultSelectOption, IsMulti extends boolean = false>
    extends Omit<SelectProps<Option, IsMulti>, 'defaultValue' | 'value' | 'options' | 'loadOptions' | 'isLoading'> {
    defaultValue?: string | string[]
    value?: string | string[]
}

export const CountrySelect: React.FunctionComponent<Props<DefaultSelectOption>> = props => {
    return (
        <Select
            {...props}
            options={countryOptions}
            defaultValue={getValue(props.defaultValue)}
            value={getValue(props.value)}
        />
    )

    function getValue(value?: string | string[]) {
        if (typeof value === 'undefined') {
            return value
        }

        if (props.isMulti) {
            return (value as string[]).map(value => {
                return {
                    value: value as string,
                    label: countriesObject[value as string],
                }
            })
        }

        return {
            value: value as string,
            label: countriesObject[value as string],
        }
    }
}

export function getCountryLabelByCode(code: string): string {
    return countries.getName(code, 'nl') || ''
}
