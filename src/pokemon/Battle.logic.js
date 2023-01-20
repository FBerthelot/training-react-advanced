import { useCallback, useEffect, useReducer } from "react"

const reducer = (state, action) => {
    switch(action.type) {
        case 'initiateBattle':
            return {
                ...state,
                attacker: {
                    hp: 100,
                    name: action.payload.pok1
                },
                defender: {
                    hp: 100,
                    name: action.payload.pok2
                },
                duration: 0,
                nextMove: 'attacker',
                winner: null
            }
        case 'startRound': {
            return {
                ...state,
                [state.nextMove]: {
                    ...state[state.nextMove],
                    hp: state[state.nextMove].hp - 10
                },
                duration: state.duration + 1,
                nextMove: state.nextMove === 'defender' ? 'attacker' : 'defender',
                winner: state[state.nextMove].hp - 10 > 0 ?
                    null :
                    state.nextMove
            }
        }
        default:
            throw new Error(`wrong action type: ${action.type}`);
    }
}

export const useBattle = () => {
    const [state, dispatch] = useReducer(reducer, {
        attacker: undefined,
        defender: undefined,
        winner: null,
        nextMove: null,
        duration: 0
    })

    const fightHasStarted = state.attacker && state.defender

    useEffect(() => {
        if(!fightHasStarted || state.winner) {
            return;
        }

        const interval = setInterval(() => {
            dispatch({type: 'startRound'})
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [fightHasStarted, state.winner])

    const startBattle = useCallback((pok1, pok2) => dispatch({type: 'initiateBattle', payload: {pok1, pok2}}), [])

    return {
        attacker: state.attacker,
        defender: state.defender,
        fightHasStarted,
        winner: state.winner,
        duration: state.duration,
        startBattle
    }
}