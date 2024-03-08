import QueryString from 'qs'
import { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

interface Props<T> {
    children: (state: ParamStateOptions<T>) => JSX.Element
    defaultState: ParamState<T>
}

interface ParamStateOptions<T> {
    paramState: ParamState<T>
    setParamState: (state: Partial<ParamState<T>>) => void
}

type ParamState<T> = {
    [K in keyof T]?: T[K]
}

export function ParamsManager<T>(props: Props<T>) {
    const history = useHistory()
    const location = useLocation()

    const defaultState = getDefaultState()
    const [paramState, setParamState] = useState<ParamState<T>>(defaultState)

    const updateLocationCb = useCallback(() => {
        const stringifiedSearch = QueryString.stringify(paramState, { skipNulls: true })

        history.replace({
            pathname: location.pathname,
            search: stringifiedSearch,
        })
    }, [paramState, history, location.pathname])

    useEffect(() => {
        updateLocationCb()
    }, [updateLocationCb])

    return props.children({ paramState, setParamState: setParamsStateAndUrlParams })

    function setParamsStateAndUrlParams(state: Partial<ParamState<T>>) {
        setParamState({ ...paramState, ...state })
    }

    function getDefaultState() {
        if (!location.search) {
            return props.defaultState
        }

        return QueryString.parse(location.search, {
            ignoreQueryPrefix: true,
            decoder: decodeURIComponent,
        }) as ParamState<T>
    }
}
