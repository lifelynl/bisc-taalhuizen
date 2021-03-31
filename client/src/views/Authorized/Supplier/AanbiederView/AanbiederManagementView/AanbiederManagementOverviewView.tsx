import React, { useState } from 'react'
import { t } from '@lingui/macro'

import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { useLingui } from '@lingui/react'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { aanbiederManagementProfile, AanbiederManagementProfile } from '../mocks'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import {
    AanbiederManagementTab,
    AanbiederManagementTabs,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementTabs'
import { AanbiederManagementDataContainer } from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementDataContainer'
import ActionBar from 'components/Core/Actionbar/Actionbar'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Form from 'components/Core/Form/Form'

export const AanbiederManagementOverviewView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const [isEditing, setIsEditing] = useState(false)

    // TODO: replace with the api call/query (using participantId prop)
    const { data, loading, error } = useMockQuery<AanbiederManagementProfile>(aanbiederManagementProfile)
    // TODO: add mutation

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Beheer`)} />
            <Column spacing={10}>
                {renderTabs()}
                <Form onSubmit={handleEdit}>
                    {renderList()}
                    <ActionBar RightComponent={renderButtons()} />
                </Form>
            </Column>
        </>
    )

    function renderTabs() {
        if (isEditing) {
            return
        }

        return <AanbiederManagementTabs currentTab={AanbiederManagementTab.overview} />
    }

    function renderList() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <AanbiederManagementDataContainer isEditing={isEditing} defaultValues={data} />
    }

    function renderButtons() {
        if (isEditing) {
            return (
                <Row>
                    {/* TODO: use loading const from mutation */}
                    <Button type={ButtonType.secondary} disabled={loading} onClick={() => setIsEditing(false)}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                    {/* TODO: use loading const from mutation */}
                    <Button type={ButtonType.primary} submit={true} loading={loading}>
                        {i18n._(t`Opslaan`)}
                    </Button>
                </Row>
            )
        }

        return (
            <Button type={ButtonType.primary} onClick={() => setIsEditing(true)}>
                {i18n._(t`Bewerken`)}
            </Button>
        )
    }

    // TODO
    function handleEdit(e: React.FormEvent) {
        setIsEditing(false)
        return
    }
}
