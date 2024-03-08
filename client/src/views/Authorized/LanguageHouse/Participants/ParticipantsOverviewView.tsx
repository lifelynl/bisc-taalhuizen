import { SortDirection } from 'components/Core/Table/TableHeader'
import { ParamsManager } from 'components/Domain/Shared/components/ParamManager/ParamManager'
import { LanguageHouseParticipantsTableContainer } from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantsTableContainer'
import { SortInput, TeamType } from 'graphql/v2/generated/graphql'

interface Params {
    sort?: SortDirection
    search?: string
    team?: Pick<TeamType, 'id' | 'name'> | null
}

export const ParticipantsOverviewView: React.FunctionComponent = () => {
    return (
        <ParamsManager<Params> defaultState={{ sort: { field: 'intakeDate', direction: SortInput.Desc } }}>
            {({ paramState, setParamState }) => {
                return (
                    <LanguageHouseParticipantsTableContainer
                        onSortDirectionChange={sort => setParamState({ sort })}
                        sortDirection={paramState.sort}
                        searchValue={paramState.search}
                        onSearch={search => setParamState({ search })}
                        selectedTeam={paramState.team}
                        onSelectTeam={team => setParamState({ team })}
                    />
                )
            }}
        </ParamsManager>
    )
}
