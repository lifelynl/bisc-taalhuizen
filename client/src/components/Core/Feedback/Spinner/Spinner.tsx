import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import lottie, { AnimationItem } from 'lottie-web/build/player/lottie_light' // Using light version for lighter bundle

import styles from './Spinner.module.scss'
import useCountDown from '../../../../utils/useCountDown'
import pageSpinnerData from '../../../../assets/animations/pageSpinner.json'
import simpleSpinnerData from '../../../../assets/animations/simpleSpinner.json'
import uniqueId from 'lodash/uniqueId'

interface Props {
    className?: string
    delayed?: boolean
    small?: boolean
    large?: boolean
    slow?: boolean
    type?: Animation
}

export enum Animation {
    pageSpinner = 'pageSpinner',
    simpleSpinner = 'simpleSpinner',
}

const Spinner: React.FunctionComponent<Props> = props => {
    const [animation, setAnimation] = useState<AnimationItem>()

    const { delayed } = props
    const spinnerClassName = getClassName()
    const animationData = getAnimationData()
    const elementId = `animation-container-${uniqueId()}`

    const memoizedAnimation = useCallback(() => {
        const container = document.getElementById(elementId)
        if (!container) {
            return
        }

        const animation: AnimationItem = lottie.loadAnimation({
            container,
            loop: true,
            autoplay: true,
            animationData,
        })

        return animation
    }, [elementId, animationData])

    useEffect(() => {
        if (!animation) {
            setAnimation(memoizedAnimation())
        }
    }, [animation, memoizedAnimation])

    const countDownTime = delayed ? 300 : 0
    useCountDown(countDownTime, timeoutCallback)

    return <div className={spinnerClassName} id={elementId} />

    function getClassName() {
        const { className, small, large } = props

        return classNames(styles.spinner, className, {
            [styles.isSmall]: small,
            [styles.isLarge]: large,
        })
    }

    function getAnimationData() {
        const { type } = props

        switch (type) {
            case Animation.pageSpinner:
                return pageSpinnerData
            default:
                return simpleSpinnerData
        }
    }

    function timeoutCallback() {
        const { slow } = props
        const speed = slow ? 0.6 : 1

        if (animation) {
            animation.setSpeed(speed)
            animation.play()
        }
    }
}

export default Spinner
