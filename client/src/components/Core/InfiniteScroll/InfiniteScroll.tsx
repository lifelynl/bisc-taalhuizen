import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { default as ReactInfiniteScroll } from 'react-infinite-scroller'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from '../Layout/Center/Center'
import styles from './InfiniteScroll.module.scss'

/**
 * Make sure that this number is always large enough
 * to fill the screen. Otherwise no scroll will be triggered
 * and the pagination will not trigger, even though there might
 * be additional pages. Take into account:
 * - normal page with table
 * - tables within modals (e.g. the modal size until it becomes scrollable)
 * - desktop screen heights (they can be huge or zoomed out)
 */
export const DEFAULT_INITIAL_PAGE_SIZE = 50
const DEFAULT_INCREMENTAL_PAGE_SIZE = 25

interface Props {
    hasMore: boolean
    loadMore: (LoadMoreParams: PaginationArgs) => Promise<any>
    take?: number // incremental take for each page, defaults to DEFAULT_PAGE_SIZE
    initialTake?: number // defaults to DEFAULT_INITIAL_PAGE_SIZE
    children: React.ReactNode
    ref?: React.Ref<InfiniteScrollRef>
}

export interface InfiniteScrollRef {
    reset: () => void
}

export interface PaginationArgs {
    skip: number
    take: number
}

export const InfiniteScroll = React.forwardRef(InfiniteScrollComponent)

function InfiniteScrollComponent(props: Props, ref: React.Ref<InfiniteScrollRef>) {
    const { children, loadMore, hasMore } = props
    const take = props.take !== undefined ? props.take : DEFAULT_INCREMENTAL_PAGE_SIZE
    const initialTake = props.initialTake !== undefined ? props.initialTake : DEFAULT_INITIAL_PAGE_SIZE

    const [allowRender, setAllowRender] = useState<boolean>(false)
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
    const [scrollParentRef, setScrollParentRef] = useState<HTMLDivElement | null>(null)
    const infiniteScrollRef = useRef<ReactInfiniteScroll>(null)

    const handleLoadMore = useCallback(
        async (page: number) => {
            if (hasMore && !isLoadingMore) {
                setIsLoadingMore(true)
                await loadMore({
                    skip: initialTake + (page - 1) * take,
                    take: take,
                })
                setIsLoadingMore(false)
            }
        },
        [hasMore, isLoadingMore, setIsLoadingMore, loadMore, initialTake, take]
    )

    useEffect(() => {
        /**
         * ReactInfiniteScroll needs to mount with the scrollParentRef
         * being directly available. So we trigger an extra render cycle
         * by using the allowRender state.
         */
        if (scrollParentRef) {
            setAllowRender(true)
        }
    }, [scrollParentRef, setAllowRender])

    useImperativeHandle(ref, () => ({ reset }), [])

    return (
        <div ref={ref => setScrollParentRef(ref)}>
            {allowRender && (
                <ReactInfiniteScroll
                    // NOTE: This ref causes a warning in the browser console which can be ignored as it is working as intended
                    // issue lays with the 'react-infinite-scroller' library and does not seem likely to be fixed
                    ref={infiniteScrollRef}
                    loadMore={handleLoadMore}
                    pageStart={0}
                    hasMore={hasMore && !isLoadingMore}
                    initialLoad={false}
                    useWindow={false}
                    getScrollParent={() => {
                        return (
                            scrollParentRef?.closest('.ReactModal__Content') ||
                            scrollParentRef?.closest('[data-scroll]') ||
                            null
                        )
                    }}
                    threshold={50}
                    useCapture={false}
                >
                    {children}
                    {isLoadingMore && (
                        <Center className={styles.spinner}>
                            <br />
                            <Spinner type={SpinnerAnimation.simpleSpinner} />
                        </Center>
                    )}
                </ReactInfiniteScroll>
            )}
        </div>
    )

    function reset() {
        if ((infiniteScrollRef.current as any).pageLoaded !== undefined) {
            ;(infiniteScrollRef.current as any).pageLoaded = 0
        }
    }
}
