import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Row from 'components/Core/Layout/Row/Row'
import { LanguageHouseProvidersContainer } from 'components/Domain/LanguageHouse/Containers/LanguageHouseProvidersContainer'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BiscLanguageHousesDetailRouteParams, biscRoutes } from 'routes/bisc/biscRoutes'

export const LanguageHouseProvidersView: React.FunctionComponent = () => {
    const { languageHouseId } = useParams<BiscLanguageHousesDetailRouteParams>()
    const { i18n } = useLingui()
    const organizationSlug = useContext(SessionContext).organizationSlug
    const history = useHistory()

    return (
        <LanguageHouseProvidersContainer
            languageHouseId={languageHouseId}
            readOnly={true}
            renderActions={() => (
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.primary}
                                onClick={() =>
                                    history.push(
                                        biscRoutes(organizationSlug).languageHouses.detail(languageHouseId).providers
                                            .update
                                    )
                                }
                            >
                                {i18n._(`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            )}
        />
    )
}
