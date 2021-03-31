import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { AanbiedersDocument, useDeleteAanbiederMutation } from 'generated/graphql'
import { routes } from 'routes/routes'

interface Props {
    onClose: () => void
    supplierid: string
    suppliername: string
}

const AanbiederDeleteModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [deleteAanbieder, { loading }] = useDeleteAanbiederMutation()
    const { onClose, supplierid, suppliername } = props

    async function handleDelete() {
        const response = await deleteAanbieder({
            variables: {
                id: supplierid,
            },
            refetchQueries: [{ query: AanbiedersDocument }],
        })

        if (response.errors?.length) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Aanbieder is verwijderd`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )
        history.push(routes.authorized.supplier.bisc.index)
    }

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Aanbieder ${suppliername} verwijderen`)} heading="H4" />
                    <Paragraph>
                        {i18n._(t`
                                Weet je zeker dat je de aanbieder wil verwijderen? Hiermee worden ook alle onderliggende medewerkers en deelnemers verwijderd.`)}
                    </Paragraph>
                </Column>
            }
            BottomComponent={
                <>
                    <Button type={ButtonType.secondary} onClick={onClose}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                    <Button
                        danger={true}
                        type={ButtonType.primary}
                        icon={IconType.delete}
                        onClick={handleDelete}
                        loading={loading}
                    >
                        {i18n._(t`Verwijderen`)}
                    </Button>
                </>
            }
        />
    )
}

export default AanbiederDeleteModalView
