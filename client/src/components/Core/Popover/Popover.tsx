import React, { ReactNode, useState, useRef, useEffect } from 'react'
import { Instance } from '@popperjs/core'
import styles from './Popover.module.scss'
import { Popper } from '@mui/material'

interface Props {
    popoverDisplay: () => ReactNode
    popoverButton: () => ReactNode
    buttonStyling: string
}

const Popover: React.FunctionComponent<Props> = props => {
    const popperRef = useRef<Instance>(null)
    const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null)
    const open = Boolean(anchorEl)

    const { popoverDisplay, popoverButton, buttonStyling } = props

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [popperRef])

    return (
        <>
            <button
                type="button"
                className={buttonStyling}
                onClick={event => {
                    setAnchorEl(anchorEl ? null : event.currentTarget)
                }}
            >
                {popoverButton()}
            </button>
            <Popper
                popperRef={popperRef}
                open={open}
                anchorEl={anchorEl}
                placement={'right-start'}
                className={styles.popperContainter}
            >
                {popoverDisplay()}
            </Popper>
        </>
    )

    function handleClickOutside(event: MouseEvent) {
        if (popperRef.current && !popperRef.current.state.elements.popper.contains(event.target as Node)) {
            setAnchorEl(null)
        }
    }
}

export default Popover
