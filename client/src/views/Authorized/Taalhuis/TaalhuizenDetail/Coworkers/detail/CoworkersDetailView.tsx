import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import TaalhuisCoworkersInformationFieldset from '../../../../../../components/fieldsets/taalhuis/TaalhuisCoworkersInformationFieldset'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../../routes/routes'
import { TaalhuisCoworkersDetailParams } from '../../../../../../routes/taalhuis/types'
import { coworkerCreateResponse } from '../mocks/coworkers'

interface Props {}

const CoworkersDetailView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { taalhuisid, taalhuisname } = useParams<TaalhuisCoworkersDetailParams>()
    const { data, loading, error } = useMockQuery(coworkerCreateResponse)

    if (!taalhuisid) {
        return null
    }

    return (
        <>
            <Headline
                title={i18n._(t`Peter De Wit`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                        <Breadcrumb
                            text={i18n._(t`${taalhuisname}`)}
                            to={routes.authorized.taalhuis.read.data({ taalhuisid, taalhuisname })}
                        />
                        <Breadcrumb
                            text={i18n._(t`Medewerkers`)}
                            to={routes.authorized.taalhuis.read.coworkers.overview({ taalhuisid, taalhuisname })}
                        />
                    </Breadcrumbs>
                }
            />
            {renderSection()}
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button type={ButtonType.primary} icon={IconType.send} onClick={handleEdit}>
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </>
    )

    function renderSection() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (data) {
            return (
                <TaalhuisCoworkersInformationFieldset
                    readOnly={true}
                    prefillData={{
                        lastName: data.achternaam,
                        insertion: data.tussenvoegsel,
                        nickName: data.roepnaam,
                        phoneNumber: data.telefoonnummer,
                        role: data.rol,
                        email: data.email,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                    }}
                />
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
    }

    function handleEdit() {
        if (data) {
            history.push(
                routes.authorized.taalhuis.read.coworkers.detail.update({
                    taalhuisid,
                    taalhuisname,
                    coworkerid: i18n._(t`Peter De Wit`),
                })
            )
        }
    }
}

export default CoworkersDetailView
