import { useEffect } from "react"
import { useBattle } from "./Battle.logic"


export const Battle = ({pok1, pok2}) => {
    const battleState = useBattle()

    useEffect(() => {
        battleState.startBattle(pok1, pok2)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pok1, pok2])

    if(!battleState.fightHasStarted) {
        return 'Le combat commence !'
    }


    return (
    <section>
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