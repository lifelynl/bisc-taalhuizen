import Column from 'components/Core/Layout/Column/Column'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Field from 'components/Core/Field/Field'
import Input from 'components/Core/DataEntry/Input'
import TextArea from 'components/Core/DataEntry/TextArea'
import { Maybe } from 'graphql/v2/generated/graphql'

interface Props {
    defaultValues?: LearningQuestionsDefaultValues
    readOnly?: boolean
}
export interface LearningQuestionsFieldsetModel {
    description: string
    motivation: string
}

interface LearningQuestionsDefaultValues {
    description?: Maybe<string>
    motivation?: Maybe<string>
}

export const LearningQuestionsFields: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    return <Column spacing={4}>{renderFields()}</Column>

    function renderFields() {
        const { readOnly, defaultValues } = props

        if (readOnly && defaultValues) {
            return (
                <>
                    <Field label={i18n._(t`Korte omschrijving`)} horizontal={true}>
                        {defaultValues.description}
                    </Field>
                    <Field label={i18n._(t`Motivatie`)} horizontal={true}>
                        {defaultValues.motivation}
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field label={i18n._(t`Korte omschrijving`)} horizontal={true} required={true}>
                    <Input
                        name="description"
                        placeholder={i18n._(t`Beschrijving`)}
                        defaultValue={defaultValues?.description ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Motivatie`)} horizontal={true} required={true}>
                    <TextArea
                        name="motivation"
                        placeholder={i18n._(t`Motivatie`)}
                        defaultValue={defaultValues?.motivation ?? undefined}
                    />
                </Field>
            </>
        )
    }
}
