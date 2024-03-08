import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Modal from 'components/Core/Modal/Modal'
import { NameFormatters } from 'utils/formatters/name/Name'
import { RegistrationDeleteModal } from 'components/Domain/LanguageHouse/Modal/RegistrationDeleteModal'
import {
    LanguageHouseRegistrationDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { RegistrationReadFields } from 'components/Domain/PublicRegistration/Fields/RegistrationReadFields'
import {
    StudentType,
    useAcceptRegistrationMutation,
    useStudentForRegistrationQuery,
} from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const RegistrationReadView: React.FunctionComponent = () => {
    const { languageHouseParticipantId } = useParams<LanguageHouseRegistrationDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { data, loading, error } = useStudentForRegistrationQuery({
        variables: {
            studentId: languageHouseParticipantId,
        },
    })

    const [acceptRegistrationMutation, { loading: acceptStudentLoading }] = useAcceptRegistrationMutation({
        update(cache) {
            cache.evict({ fieldName: 'students' })
        },
    })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    if (error || !data?.student) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <>
            <Headline
                title={i18n._('Aanmelding {name}', { name: NameFormatters.formattedFullname(data.student.person) })}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.languageHouse(organizationSlug).participants.overview,
                            breadcrumbItems.languageHouse(organizationSlug).participants.registrations.overview,
                        ]}
                    />
                }
                spacingType={SpacingType.default}
            />
            <Column spacing={10}>
                <RegistrationReadFields student={data.student as Partial<StudentType>} />
            </Column>
            <Actionbar
                LeftComponent={
                    <Button type={ButtonType.secondary} icon={IconType.delete} onClick={() => setModalIsVisible(true)}>
                        {i18n._(t`Aanmelding verwijderen`)}
                    </Button>
                }
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        icon={IconType.checkmark}
                        loading={acceptStudentLoading}
                        onClick={() => handleRegistration()}
                    >
                        {i18n._(t`Aanmelding accepteren`)}
                    </Button>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <RegistrationDeleteModal
                    studentId={data.student.id}
                    studentName={NameFormatters.formattedFullname(data.student.person)}
                    onClose={() => setModalIsVisible(false)}
                />
            </Modal>
        </>
    )

    async function handleRegistration() {
        try {
            await acceptRegistrationMutation({
                variables: {
                    studentId: languageHouseParticipantId,
                },
            })

            NotificationsManager.success(
                i18n._(t`Aanmelding is geaccepteerd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(languageHouseRoutes(organizationSlug).participants.registrations.index)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
