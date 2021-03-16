import { i18n } from '@lingui/core'
import { Plural, t, Trans } from '@lingui/macro'
import { withI18n, withI18nProps, useLingui } from '@lingui/react'
import React from 'react'
import Button from '../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import { I18nLoaderContext } from '../../../components/Providers/I18nLoader/context'
import { Language } from '../../../components/Providers/I18nLoader/types'

interface Props {}

interface State {
    email: string | null
}

export class LinguiExample extends React.Component<Props, State> {
    public render() {
        return (
            <div>
                <div>
                    {/* when working inside react, use macro components */}
                    <h1>
                        <Trans>LinguiJS best practises example</Trans>
                    </h1>

                    {/*
                        You can also use components inside the Trans component,
                        this will look like: <0>this is a link test:<1>link</1></0> in the po files
                    */}
                    <Trans>
                        <p>
                            this is a link test:
                            <a style={{ color: 'red' }}>link</a>
                        </p>
                    </Trans>

                    {/*
                        You can also pass values inside the translations
                        this will look like: <0>this is a link test:<1>{0}</1></0> in the po files
                    */}
                    <Trans>
                        <p>
                            there are:
                            <span style={{ color: 'red' }}>{100}</span>
                            bananas
                        </p>
                    </Trans>

                    {/*
                        Using translation strings.
                    */}

                    {/*
                        Another possibility would be wrapping your component or function with a withI18n function
                    */}
                    <ComponentWithTranslations onPress={this.handleSubmit} />

                    {/*  */}
                    <FunctionalComponentWithTranslations onPress={this.handleSubmit} />

                    {/*
                        When you want to use Plurals in your translations you can use the React component
                    */}
                    <Plural
                        value={1}
                        one={
                            <p>
                                Only <span style={{ fontSize: 20 }}>one</span> user is using this library!
                            </p>
                        }
                        other={
                            <p>
                                <span style={{ fontSize: 20 }}>{1}</span> users are using this library!
                            </p>
                        }
                    />

                    {/* Language switch */}
                    <I18nLoaderContext.Consumer>
                        {({ toggleLanguage, language }) => (
                            <select
                                onChange={e => {
                                    toggleLanguage?.(e.target.value as Language)
                                }}
                                defaultValue={language}
                            >
                                <option value={'nl'}>nl</option>
                                <option value={'en'}>en</option>
                            </select>
                        )}
                    </I18nLoaderContext.Consumer>
                </div>
            </div>
        )
    }

    private handleSubmit = () => {
        const oopsiefailed = false
        // when you are outside react and you want to use a string. We should use the i18n onbject

        if (oopsiefailed) {
            NotificationsManager.error(i18n._(t`example-failed title`), i18n._(t`example-failed message`))
            return
        }

        NotificationsManager.success(i18n._(t`example-success title`), i18n._(t`example-success message`))
    }
}

const FunctionalComponentWithTranslations = ({ onPress }: { onPress: () => void }) => {
    const { i18n } = useLingui()

    return (
        <Button onClick={() => alert(i18n._(t`This is a alert`))}>{i18n._(t`functional component with i18n`)}</Button>
    )
}

// When you are using oop and you want to use i18n through props you can use it like this
const ComponentWithTranslations = withI18n()(
    class ComponentWithTranslations extends React.Component<{ onPress: () => void } & withI18nProps, State> {
        public render() {
            const { i18n, onPress } = this.props

            return <Button onClick={onPress}>{i18n._(t`oop component with i18n`)}</Button>
        }
    }
)
