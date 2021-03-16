import React from 'react'
import Paragraph from '../../../components/Core/Typography/Paragraph'
import Space from '../../../components/Core/Layout/Space/Space'
import { useMyProgramsQuery } from '../../../generated/graphql'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import View from '../Dev/DevView'

export default function MyProgramsView() {
    const { data, loading, error } = useMyProgramsQuery()

    if (loading) {
        return <View title={'Loading'} />
    }

    if (error || !data) {
        return (
            <View title={'Error'}>
                <Paragraph centered={true}>{error ? error.message : 'No data'}</Paragraph>
            </View>
        )
    }

    return (
        <View title={'My Programs'}>
            {data.myPrograms.map(program => (
                <Paragraph centered={true}>
                    {program.id} - {program.name}
                </Paragraph>
            ))}

            <Space pushTop={true}>
                <Button type={ButtonType.primary} stretch={true} onClick={() => window.location.reload()}>
                    Refresh
                </Button>
            </Space>
        </View>
    )
}
