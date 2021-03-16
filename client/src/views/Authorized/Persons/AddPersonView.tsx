import React, { useState } from 'react'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import Field from '../../../components/Core/Field/Field'
import Input from '../../../components/Core/DataEntry/Input'
import Column from '../../../components/Core/Layout/Column/Column'
import Space from '../../../components/Core/Layout/Space/Space'
import Paragraph from '../../../components/Core/Typography/Paragraph'
import { useAddPersonMutation } from '../../../generated/graphql'
import {
    FormattedInputValidationError,
    getErrorForField,
    getInputValidationErrors,
    hasInputValidationError,
} from '../../../utils/errors'
import View from '../Dev/DevView'

export default function AddPersonView() {
    const [mutate, { loading }] = useAddPersonMutation()
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [inputErrors, setInputErrors] = useState<FormattedInputValidationError[]>([])

    const buttonDisabled = canBeSubmitted() !== true

    return (
        <View title={'Add new Person'}>
            <form style={{ flex: 1, display: 'flex' }} onSubmit={handleSubmit}>
                <Column spacing={5}>
                    {error && (
                        <Paragraph centered={true} error={true}>
                            {error}
                        </Paragraph>
                    )}
                    {success && <Paragraph centered={true}>{success}</Paragraph>}

                    <Paragraph centered={true}>Enter a name and add new Person</Paragraph>
                    <Column spacing={3}>
                        <Field label={'New Person name'}>
                            <Input
                                name={'name'}
                                placeholder={'John Allan Doe'}
                                value={name}
                                onChangeValue={setName}
                                // errorMessage={getErrorForField('name', inputErrors)}
                            />
                        </Field>
                    </Column>
                    <Space pushTop={true}>
                        <Button
                            type={ButtonType.primary}
                            stretch={true}
                            submit={true}
                            disabled={buttonDisabled}
                            loading={loading}
                        >
                            Add new Person
                        </Button>
                    </Space>
                </Column>
            </form>
        </View>
    )

    function canBeSubmitted() {
        if (name) {
            return true
        }

        return false
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setInputErrors([])
        setError('')
        setSuccess('')

        const response = await mutate({
            variables: {
                name: name!,
            },
        })

        if (response.data?.addPerson) {
            setSuccess(`Person "${response.data?.addPerson.node.name}" was added`)
            resetFields()

            return
        }

        if (hasInputValidationError(response.errors)) {
            const errors = getInputValidationErrors(response.errors)
            setInputErrors(errors)

            return
        }

        setError('Could not add Person')
        return
    }

    function resetFields() {
        setName('')
    }
}
