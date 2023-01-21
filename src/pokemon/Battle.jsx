import { useEffect } from "react"
import { useBattle } from "./Battle.logic"
import { useMatchMakingContextProvider } from "./MatchMaking.context"


export const Battle = ({pok1, pok2}) => {
    const battleState = useBattle()
    const {selectedPokemon} = useMatchMakingContextProvider()

    useEffect(() => {
        battleState.startBattle(selectedPokemon[0], selectedPokemon[1])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPokemon[0], selectedPokemon[1]])

    if(!battleState.fightHasStarted) {
        return 'Le combat commence !'
    }


    return (
    <section>
        <p>Le combat a commencé depuis {battleState.duration}s</p>
        <ul>
            <li>
                {battleState.attacker.name} - {battleState.attacker.hp} PV
            </li>
            <li>
                {battleState.defender.name} - {battleState.defender.hp} PV
            </li>
        </ul>
        {battleState.winner ? `C'est ${battleState[battleState.winner].name} qui a gagné !` : null}
    </section>
    );
}