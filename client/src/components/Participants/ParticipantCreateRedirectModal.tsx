import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import ModalView from 'components/Core/Modal/ModalView'
import Paragraph from 'components/Core/Typography/Paragraph'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'

interface Props {
    studentId: string
}

export const ParticipantCreateRedirectModal: React.FunctionComponent<Props> = ({ studentId }) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { organizationSlug } = useContext(SessionContext)
    const basePath = languageHouseRoutes(organizationSlug).participants.detail(studentId)

    return (
        <ModalView
            title={i18n._('Direct een verwijzing of leervraag aanmaken?')}
            ContentComponent={renderContent()}
            BottomComponent={renderBottomComponent()}
            onClose={handleClose}
        />
    )

    function renderContent() {
        return (
            <Paragraph>{i18n._('Wil je direct een verwijzing of leervraag aanmaken voor deze deelnemer?')}</Paragraph>
        )
    }

    function renderBottomComponent() {
        return (
            <Row>
                <Button type={ButtonType.secondary} onClick={handleClose}>
                    {i18n._('Nee, bedankt')}
                </Button>
                <Button
                    icon={IconType.add}
                    type={ButtonType.primary}
                    onClick={() => history.push(basePath.data.learningNeeds.create)}
                >
                    {i18n._('Nieuwe Leervraag')}
                </Button>
                <Button
                    icon={IconType.add}
                    type={ButtonType.primary}
                    onClick={() => history.push(basePath.data.learningNeeds.createReferral)}
                >
                    {i18n._('Korte verwijzing')}
                </Button>
            </Row>
        )
    }

    function handleClose() {
        history.push(basePath.index)
    }
}
