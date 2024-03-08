import { Maybe } from 'graphql/v2/generated/graphql'

interface PersonPartial {
    givenName?: Maybe<string>
    additionalName?: Maybe<string>
    familyName?: Maybe<string>
}

class Name {
    public formattedFullname = (person?: PersonPartial | null) => {
        if (!person) {
            return ''
        }

        const fullName = [person.givenName, person.additionalName, person.familyName].filter(part => !!part).join(' ')
        return fullName
    }

    public formattedLastName = (person: PersonPartial) => {
        const familyName = [person.familyName, person.additionalName].filter(part => !!part).join(', ')
        return familyName
    }
}

export const NameFormatters = new Name()
