import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Space from 'components/Core/Layout/Space/Space'
import { OwnProfileFields } from 'components/Domain/Participation/Fields/OwnProfileFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props extends RouteComponentProps {}

export const ProfileDataView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const user = useContext(SessionContext).user
    const history = useHistory()

    if (!user) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            <Headline title={NameFormatters.formattedFullname(user.person)} />
            <Column spacing={10}>
                <OwnProfileFields readOnly={true} />
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button type={ButtonType.primary} onClick={() => history.push(routes.authorized.profile.update)}>
                        {i18n._(t`Wachtwoord wijzigen`)}
                    </Button>
                }
            />
        </>
    )
}
