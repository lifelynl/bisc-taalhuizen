import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'

interface Props {}

export const CoworkerOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()

    return <Headline title={i18n._(t`Medewerkers`)} spacingType={SpacingType.small} />
}
