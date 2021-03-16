import React from 'react'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'

interface Props {}

export const RegistrationReadView: React.FunctionComponent<Props> = () => {
    return (
        <>
            <Headline title={'Registratie 0'} spacingType={SpacingType.default} />
        </>
    )
}
