import React, { useState } from 'react'
import Actionbar from '../../../components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import Password from '../../../components/Core/DataEntry/Password'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import PasswordStrengthBar from '../../../components/Core/Feedback/PasswordStrengthBar/PasswordStrengthBar'
import Field from '../../../components/Core/Field/Field'
import Section from '../../../components/Core/Field/Section'
import Column from '../../../components/Core/Layout/Column/Column'
import Space from '../../../components/Core/Layout/Space/Space'
import PageTitle, { PageTitleSize } from '../../../components/Core/Text/PageTitle'

interface Props {}

const ProfilePage: React.FunctionComponent<Props> = () => {
    const [password, setPassword] = useState<string>()

    return (
        <>
            <Column spacing={12}>
                <PageTitle title={'Rick Woltheus'} size={PageTitleSize.default} />
                <Section title={'Wachtwoord aanpassen'}>
                    <Column spacing={4}>
                        <Field label={'Huidig wachtwoord'} horizontal={true}>
                            <Password placeholder={'Wachtwoord'} onChange={undefined} />
                        </Field>

                        <Field label={'Nieuw wachtwoord'} horizontal={true}>
                            <Column spacing={4}>
                                <Password placeholder={'Wachtwoord'} onChangeValue={value => setPassword(value)} />
                                <PasswordStrengthBar value={password} />
                                <Space />
                            </Column>
                        </Field>

                        <Field label={'Bevestig wachtwoord'} horizontal={true}>
                            <Password placeholder={'Wachtwoord'} onChange={undefined} />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button type={ButtonType.primary} onClick={() => NotificationsManager.success('title', 'test')}>
                        Wachtwoord wijzigen
                    </Button>
                }
            />
        </>
    )
}

export default ProfilePage
