import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router'

import Headline, { SpacingType } from 'components/Chrome/Headline'
import Form from 'components/Core/Form/Form'
import ActionBar from 'components/Core/Actionbar/Actionbar'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import Column from 'components/Core/Layout/Column/Column'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import AccountInformationFieldset from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'
import { UserRoleEnum } from 'generated/graphql'

export const AanbiederManagementEmployeesCreateView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        <Column spacing={10}>
            {/* TODO: add breadcrumbs */}
            <Headline spacingType={SpacingType.small} title={i18n._(t`Nieuwe medewerker`)} />
            <Form onSubmit={handleSubmit}>
                {renderFormFields()}
                <ActionBar RightComponent={renderButtons()} />
            </Form>
        </Column>
    )

    // TODO
    function handleSubmit() {
        return
    }

    function renderFormFields() {
        return (
            <>
                <InformationFieldset />
                <HorizontalRule />
                {/* TODO: add availability field (not part of current sprint) */}
                <AccountInformationFieldset
                    roleOptions={[
                        [UserRoleEnum.AanbiederCoordinator],
                        [UserRoleEnum.AanbiederMentor],
                        [UserRoleEnum.AanbiederMentor, UserRoleEnum.AanbiederCoordinator],
                        [UserRoleEnum.AanbiederVolunteer],
                    ]}
                />
            </>
        )
    }

    function renderButtons() {
        return (
            <Row>
                <Button
                    type={ButtonType.secondary}
                    // disabled={loading} TODO
                    onClick={() => history.push(supplierRoutes.management.employees.index)}
                >
                    {i18n._(t`Annuleren`)}
                </Button>
                <Button
                    submit={true}
                    icon={IconType.send}
                    // loading={loading} TODO
                >
                    {i18n._(t`Uitnodigen`)}
                </Button>
            </Row>
        )
    }
}
