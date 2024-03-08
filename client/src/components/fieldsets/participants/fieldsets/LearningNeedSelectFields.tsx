import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner from 'components/Core/Feedback/Spinner/Spinner'
import Field from 'components/Core/Field/Field'
import { useLearningNeedsQuery } from 'graphql/v2/generated/graphql'

interface Props {
    studentId: string
    onLearningNeedChange?: (selectedOther: boolean, value?: string | number) => void
}

const LearningNeedSelectFields: React.FunctionComponent<Props> = props => {
    const { studentId, onLearningNeedChange } = props
    const { i18n } = useLingui()

    const learningNeedsQuery = useLearningNeedsQuery({
        variables: {
            studentId,
            paginationArgs: {
                take: 1000, // TODO allow real pagination
            },
        },
    })

    const learningNeedOtherOption: DefaultSelectOption = {
        value: '',
        label: <strong>{i18n._('Een nieuwe leervraag')}</strong>,
    }

    return (
        <>
            <Field
                label={i18n._(t`Leervraag`)}
                horizontal={true}
                required={true}
                description={i18n._(
                    t`Selecteer een bestaande leervraag van deze deelnemer, of voeg een nieuwe leervraag toe.`
                )}
            >
                {renderSelect()}
            </Field>
        </>
    )

    function renderSelect() {
        if (learningNeedsQuery.error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`De lijst met Aanbieders kon niet worden opgehaald`)}
                />
            )
        }

        if (learningNeedsQuery.loading || !learningNeedsQuery.data) {
            return <Spinner small={true} />
        }

        const learningNeeds = learningNeedsQuery.data?.learningNeeds.nodes || []
        const learningNeedOptions = learningNeeds.map(r => ({ value: r.id, label: r.description }))
        const options = [learningNeedOtherOption, ...learningNeedOptions]

        return (
            <Select
                list="learningNeed"
                name="learningNeed"
                placeholder={i18n._(t`Selecteer leervraag`)}
                options={options}
                onChangeValue={option => {
                    onLearningNeedChange?.(
                        option ? option.value === learningNeedOtherOption.value : false,
                        option ? option.value : undefined
                    )
                }}
            />
        )
    }
}

export default LearningNeedSelectFields
