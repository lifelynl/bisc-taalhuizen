import { useState, useEffect } from 'react'

export default function useCountDown(ms: number, cb?: () => void) {
    const [timedOut, setTimedOut] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimedOut(true)

            if (cb) {
                cb()
            }
        }, ms)

        return () => clearTimeout(timer)
    }, [ms, cb])

    return timedOut
}
