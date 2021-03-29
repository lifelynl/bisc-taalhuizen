import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { TabProps } from 'components/Core/TabSwitch/types'
import BranchInformationFieldset from 'components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset from 'components/fieldsets/shared/ContactInformationFieldset'
import { useAanbiederQuery } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { SupplierDetailLocationStateProps } from '../SupplierDetailView'

interface Props {
    routeState: SupplierDetailLocationStateProps
}

enum Tabs {
    data = 'data',
    medewerkers = 'medewerkers',
}

const DataView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const history = useHistory()
    const { i18n } = useLingui()
    const { data, loading, error } = useAanbiederQuery({ variables: { id: routeState.supplierId } })

    if (!routeState.supplierId) {
        return null
    }

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.medewerkers) {
            history.push({
                pathname: routes.authorized.supplier.bisc.read.coworkers.index,
                state: routeState,
            })
        }
    }

    return (
        <>
            <Headline
                title={routeState.supplierName}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.bisc.overview} />
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
                            onClick={() =>
                                history.push({
                                    pathname: routes.authorized.supplier.bisc.read.update,
                                    state: routeState,
                                })
                            }
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
                <BranchInformationFieldset
                    fieldNaming={{
                        branch: {
                            label: i18n._(t`Naam aanbieder`),
                            placeholder: i18n._(t`Naam`),
                        },
                    }}
                    prefillData={{
                        branch: data?.aanbieder.name,
                        street: data?.aanbieder.address?.street,
                        streetNr: data?.aanbieder.address?.houseNumber,
                        streetAddition: data?.aanbieder.address?.houseNumberSuffix,
                        postcode: data?.aanbieder.address?.postalCode,
                        city: data?.aanbieder.address?.locality,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <ContactInformationFieldset
                    prefillData={{
                        phone: data?.aanbieder.telephone,
                        email: data?.aanbieder.email,
                    }}
                    fieldControls={{
                        address: {
                            hidden: true,
                        },
                        postalCode: {
                            hidden: true,
                        },
                        city: {
                            hidden: true,
                        },
                        phoneNumberContactPerson: {
                            hidden: true,
                        },
                        contactPreference: {
                            hidden: true,
                        },
                    }}
                    readOnly={true}
                />
            </>
        )
    }
}

export default DataView
