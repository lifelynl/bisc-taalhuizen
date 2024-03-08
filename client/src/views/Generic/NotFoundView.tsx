import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Spinner from 'components/Core/Feedback/Spinner/Spinner'
import { useEffect, useState } from 'react'

interface Props {}

export const NotFoundView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // this is needed to not flash the user with an error message due to edge case race conditions
        setTimeout(() => setLoading(false), 2000)
    }, [])

    if (loading) {
        return <Spinner />
    }

    return <p>{i18n._(t`Deze pagina is niet gevonden. Gebruik het menu of de terugknop om verder te gaan.`)}</p>
}
