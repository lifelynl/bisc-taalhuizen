import React from 'react'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'

interface Props {}

export const ParticipantsCreateView: React.FunctionComponent<Props> = () => {
    return (
        <>
            <Headline title={'Deelnemers'} spacingType={SpacingType.default} />
        </>
    )
}
