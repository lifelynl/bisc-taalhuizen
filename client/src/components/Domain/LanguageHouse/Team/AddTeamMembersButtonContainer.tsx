import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconToggle } from 'components/Core/Button/IconToggle'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import ModalView from 'components/Core/Modal/ModalView'
import { Table } from 'components/Core/Table/Table'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import {
    OrganizationEmployeesForTeamQuery,
    OrganizationTypeEnum,
    useEditTeamMutation,
    useOrganizationEmployeesQuery,
} from 'graphql/v2/generated/graphql'
import { useContext, useState } from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'

type EmployeesFromQuery = OrganizationEmployeesForTeamQuery['organizationEmployees']['nodes']

interface Props {
    teamId: string
    existingMemberIds: string[]
}

export const AddTeamMembersButtonContainer: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const context = useContext(SessionContext)
    const organizationId = context.user?.currentEmployee?.organization.id || ''

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedEmployees, setSelectedEmployees] = useState<EmployeesFromQuery>([])

    const [editTeam, editTeamMutation] = useEditTeamMutation({
        update(cache) {
            cache.evict({ fieldName: 'teams' })
            cache.evict({ fieldName: 'organizationEmployees' })
        },
    })

    const { data, loading, error, fetchMore } = useOrganizationEmployeesQuery({
        variables: { paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE }, organizationId },
    })

    if (!data && loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    if (!data || error) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <>
            <Button type={ButtonType.primary} icon={IconType.add} onClick={() => setModalOpen(true)}>
                {i18n._('Nieuw teamlid')}
            </Button>
            <Modal isOpen={modalOpen} big={true}>
                <ModalView
                    onClose={() => setModalOpen(false)}
                    ContentComponent={renderContent()}
                    BottomComponent={renderActions()}
                />
            </Modal>
        </>
    )

    function renderContent() {
        return (
            <Column spacing={6}>
                <SectionTitle title={i18n._('Teamlid toevoegen')} heading="H4" />
                <InfiniteScroll
                    hasMore={data?.organizationEmployees?.hasMore ?? false}
                    loadMore={paginationArgs =>
                        fetchMore({
                            variables: {
                                paginationArgs,
                            },
                        })
                    }
                >
                    {renderTable()}
                </InfiniteScroll>
            </Column>
        )
    }

    function renderActions() {
        return (
            <Row>
                <Button
                    type={ButtonType.secondary}
                    disabled={editTeamMutation.loading}
                    onClick={() => setModalOpen(false)}
                >
                    {i18n._('Annuleren')}
                </Button>
                <Button
                    type={ButtonType.primary}
                    loading={editTeamMutation.loading}
                    disabled={selectedEmployees.length === 0}
                    onClick={handleAdd}
                >
                    {i18n._('Teamleden toevoegen')}
                </Button>
            </Row>
        )
    }

    function renderTable() {
        const nonMemberEmployees = data?.organizationEmployees.nodes.filter(
            e => !props.existingMemberIds?.includes(e.id)
        )

        return (
            <Table
                rows={(nonMemberEmployees || []).map(renderEmployee)}
                lastItemIsIcon={true}
                flex={1}
                headers={[
                    { headerLabel: i18n._(`Achternaam`), field: 'lastName' },
                    { headerLabel: i18n._(`Roepnaam`), field: 'firstName' },
                    { headerLabel: i18n._(`Rol`), field: 'role' },
                    { headerLabel: i18n._(`Aangemaakt`), field: 'createdAt' },
                    { headerLabel: i18n._(`Bewerkt`), field: 'updatedAt' },
                    { headerLabel: '', field: 'icon' },
                ]}
                emptyMessage={i18n._(t`Er zijn nog geen teamleden`)}
            />
        )
    }

    function renderEmployee(employee: EmployeesFromQuery[0]) {
        return [
            <Paragraph>{(employee.person && NameFormatters.formattedLastName(employee.person)) || '-'}</Paragraph>,
            <Paragraph>{employee.person.givenName}</Paragraph>,
            employee.role ? (
                <RoleLabelTag organizationType={OrganizationTypeEnum.LanguageHouse} role={employee.role} />
            ) : (
                <></>
            ),
            <Paragraph>{DateFormatters.formattedDate(employee.createdAt)}</Paragraph>,
            <Paragraph>{DateFormatters.formattedDate(employee.updatedAt)}</Paragraph>,
            <IconToggle icon={IconType.addPerson} onToggle={toggled => handleToggle(toggled, employee)} />,
        ]
    }

    function handleToggle(toggled: boolean, employee: EmployeesFromQuery[0]) {
        const newSelecteds = toggled
            ? [...selectedEmployees, employee]
            : selectedEmployees.filter(e => e.id !== employee.id)

        setSelectedEmployees(newSelecteds)
    }

    async function handleAdd() {
        try {
            await editTeam({
                variables: {
                    input: {
                        teamId: props.teamId,
                        memberIds: [...props.existingMemberIds, ...selectedEmployees.map(e => e.id)],
                    },
                },
            })

            setModalOpen(false)
            setSelectedEmployees([])

            NotificationsManager.success(
                i18n._(`Team is bijgewerkt`),
                i18n._(`Je wordt teruggestuurd naar het overzicht`)
            )

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
