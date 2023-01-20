import { useEffect, useState } from "react"
import { PokemonCard } from "./PokemonCard"

const gen1Url = 'https://pokeapi.co/api/v2/generation/1'
const gent2Url = 'https://pokeapi.co/api/v2/generation/2'

export const MatchMaking = ({setSelectedPokemon, selectedPokemon}) => {
    const [requestStatus, setRequestStatus] = useState('loading')
    useEffect(() => {
        Promise.all([fetch(gen1Url), fetch(gent2Url)])
            .then(([res1, res2]) => {
                if(!res1.ok || !res2.ok) {
                    throw new Error('Request failed')
                }
                return Promise.all([res1.json(), res2.json()])
            })
            .then(([data1, data2]) => {
                setRequestStatus([
                    ...data1.pokemon_species.map(species => ({name: species.name, generation: 1, url: species.url})),
                    ...data2.pokemon_species.map(species => ({name: species.name, generation: 2, url: species.url}))
                ])
            })
            .catch(err => {
                console.error(err);
                setRequestStatus('error')
            })
    }, [])

    const tooglePokemonSelectedFactory = (pokemonName) => () => {
            setSelectedPokemon(selectedPokemon => {
                if(selectedPokemon.includes(pokemonName)) {
                    return selectedPokemon.filter(name => name !== pokemonName);
                }
                return [...selectedPokemon, pokemonName];
            })
    }

    if(requestStatus === 'loading') {
        // throw new Error('Une erreur sauvage apparait !');
        return (
            <section className="matchmaking">
                Chargement...
            </section>
        );
    }

    if(requestStatus === 'error') {
        return (
            <section className="matchmaking">
                Impossible de récupérer les pokémons.
                Il faut recharger la page.
            </section>
        );
    }

    const pokemons = requestStatus;

    return (
        <section className="matchmaking">
            {pokemons.map((pokemon) => {
            return <PokemonCard
                key={pokemon.name}
                selected={selectedPokemon.includes(pokemon.name)}
                onSelect={tooglePokemonSelectedFactory(pokemon.name)}
                pokemon={pokemon}
                />
            })}
        </section>
    )
}