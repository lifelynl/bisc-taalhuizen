import { i18n } from '@lingui/core'
import { format, isValid } from 'date-fns'
import { Maybe } from 'graphql/v2/generated/graphql'
import isString from 'lodash/isString'

export function getMonthAbbreviation(month: number | undefined) {
    switch (month) {
        case 1:
            return i18n._('jan')
        case 2:
            return i18n._('feb')
        case 3:
            return i18n._('mrt')
        case 4:
            return i18n._('apr')
        case 5:
            return i18n._('mei')
        case 6:
            return i18n._('jun')
        case 7:
            return i18n._('jul')
        case 8:
            return i18n._('aug')
        case 9:
            return i18n._('sep')
        case 10:
            return i18n._('okt')
        case 11:
            return i18n._('nov')
        case 12:
            return i18n._('dec')
    }
}

class Dates {
    public static formattedDate = (value?: string | Date | null, formatAs?: string) => {
        const parsedDate = Dates.parseDateString(value)

        if (parsedDate) {
            const formatted = format(parsedDate, formatAs || 'dd-MM-yyyy')
            return formatted
        }
    }

    public static formattedUsaDate = (value?: string | Date) => {
        const parsedDate = Dates.parseDateString(value)
        if (parsedDate) {
            const formatted = format(parsedDate, 'yyyy-MM-dd')
            return formatted
        }
    }

    public static parseDateString = (value?: string | Date | null) => {
        const date = typeof value === 'string' ? new Date(value) : value

        if (date && isValid(date)) {
            return date
        }
    }

    public static toString(value?: Maybe<Date | string>) {
        if (!value) {
            return
        }

        if (isString(value)) {
            return value
        }

        return value.toDateString()
    }
}

export const DateFormatters = Dates
