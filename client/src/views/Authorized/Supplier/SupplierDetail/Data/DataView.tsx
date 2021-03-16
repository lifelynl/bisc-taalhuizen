import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import Field from '../../../../../components/Core/Field/Field'
import Section from '../../../../../components/Core/Field/Section'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../../../components/Core/TabSwitch/types'
import Paragraph from '../../../../../components/Core/Typography/Paragraph'
import { useMockQuery } from '../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../routes/routes'
import { SupplierDetailParams } from '../../../../../routes/supplier/types'
import { supplierCreateResponse } from '../../mocks/suppliers'

interface Props {}

enum Tabs {
    data = 'data',
    medewerkers = 'medewerkers',
}

const DataView: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const { data, loading, error } = useMockQuery(supplierCreateResponse)
    const { i18n } = useLingui()
    const params = useParams<SupplierDetailParams>()

    if (!params.supplierid) {
        return null
    }

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.medewerkers) {
            history.push(routes.authorized.supplier.read.coworkers.index(params))
        }
    }

    return (
        <>
            <Headline
                title={params.suppliername}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
                spacingType={SpacingType.small}
            />
            <Column spacing={10}>
                <TabSwitch defaultActiveTabId={Tabs.data} onChange={handleTabSwitch}>
                    <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                    <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.medewerkers} />
                </TabSwitch>
                {renderViews()}
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.primary}
                            onClick={() => history.push(routes.authorized.supplier.read.update(params))}
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </>
    )

    function renderViews() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }
        return (
            <>
                <Section title={i18n._(t`Vestiging`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Naam taalhuis`)} horizontal={true} required={true}>
                            <Paragraph>{data?.name}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                            <Paragraph>{data?.street}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Paragraph>{data?.postalCode}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Paragraph>{data?.city}</Paragraph>
                        </Field>
                    </Column>
                </Section>
                <HorizontalRule />
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{data?.phone}</Paragraph>
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{data?.email}</Paragraph>
                        </Field>
                    </Column>
                </Section>
            </>
        )
    }
}

export default DataView
