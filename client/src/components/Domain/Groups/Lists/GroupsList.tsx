import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Table } from 'components/Core/Table/Table'
import Paragraph from 'components/Core/Typography/Paragraph'
import { DateFormatters } from 'utils/formatters/Date/Date'
import Row from '../../../Core/Layout/Row/Row'
import { IconButton } from '../../../Core/Button/IconButton'
import { IconType } from '../../../Core/Icon/IconType'
import Tooltip from '../../../Core/Feedback/Tooltip/Tooltip'
import { EducationGroupType } from 'graphql/v2/generated/graphql'
import { groupCourseTypeTranslations } from '../Translations/groupTranslations'

interface Props {
    data: Group[]
    onAddToGroup?: (groupId: string) => void
    onView?: (groupId: string) => void
}

type Group = Pick<
    EducationGroupType,
    'id' | 'name' | 'maximumParticipants' | 'minimumParticipants' | 'start' | 'end' | 'type' | 'participantCount'
>

export const GroupsList: React.FunctionComponent<Props> = props => {
    const { data, onAddToGroup, onView } = props
    const { i18n } = useLingui()
    const lastItemIsIcon = !!onAddToGroup || !!onView

    return (
        <Table
            flex={1}
            lastItemIsIcon={lastItemIsIcon}
            headers={getHeader()}
            rows={getRows()}
            emptyMessage={i18n._(t`Er zijn nog geen groepen`)}
        />
    )

    function getHeader() {
        const defaultHeader = [
            { headerLabel: i18n._(t`NAAM`), field: 'name' },
            { headerLabel: i18n._(t`TYPE CURSUS`), field: 'type' },
            { headerLabel: i18n._(t`DEELNEMERS`), field: 'participants' },
            { headerLabel: i18n._(t`BESCHIKBAAR`), field: 'available' },
            { headerLabel: i18n._(t`STARTDATUM`), field: 'startDate' },
            { headerLabel: i18n._(t`EINDDATUM`), field: 'endDate' },
        ]

        if (lastItemIsIcon) {
            return [...defaultHeader, { headerLabel: '', field: 'icon' }]
        }

        return defaultHeader
    }

    function getRows() {
        return data.map(group => {
            if (lastItemIsIcon) {
                return [...getDefaultRowItems(group), getIconRowItem(group.id)]
            }

            return getDefaultRowItems(group)
        })
    }

    function getDefaultRowItems(group: Group) {
        return [
            <Paragraph bold={true}>{group.name}</Paragraph>,
            <Paragraph>{groupCourseTypeTranslations[group.type]}</Paragraph>,
            <Paragraph>{group.participantCount || 0}</Paragraph>,
            <Paragraph>{renderAvailableParticipantsCount(group)}</Paragraph>,
            <Paragraph>{DateFormatters.formattedDate(group.start)}</Paragraph>,
            <Paragraph>{DateFormatters.formattedDate(group.end)}</Paragraph>,
        ]
    }

    function getIconRowItem(groupId: string) {
        return (
            <Row>
                {onView && (
                    <Tooltip message={i18n._(t`Groepsinformatie bekijken`)}>
                        <IconButton icon={IconType.openEye} onClick={() => onView(groupId)} />
                    </Tooltip>
                )}
                {onAddToGroup && (
                    <Tooltip message={i18n._(t`Aan groep toevoegen`)}>
                        <IconButton icon={IconType.addPerson} onClick={() => onAddToGroup(groupId)} />
                    </Tooltip>
                )}
            </Row>
        )
    }

    function renderAvailableParticipantsCount(group: Group) {
        if (typeof group.maximumParticipants !== 'number') {
            return ''
        }

        if (typeof group.participantCount !== 'number') {
            return ''
        }

        return group.maximumParticipants - group.participantCount
    }
}
