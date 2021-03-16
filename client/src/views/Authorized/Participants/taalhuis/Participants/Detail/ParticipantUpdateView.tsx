import React from 'react'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'

interface Props {}

export const ParticipantsUpdateView: React.FunctionComponent<Props> = () => {
    return (
        <>
            <Headline title={'Deelnemer 0'} spacingType={SpacingType.default} />
        </>
    )
}
