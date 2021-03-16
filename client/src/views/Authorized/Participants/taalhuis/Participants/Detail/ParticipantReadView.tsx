import React from 'react'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'

interface Props {}

export const ParticipantsReadView: React.FunctionComponent<Props> = () => {
    return (
        <>
            <Headline title={'Deelnemer 0'} spacingType={SpacingType.default} />
        </>
    )
}
