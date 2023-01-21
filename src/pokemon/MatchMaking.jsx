import { useQuery } from "react-query"
import { useMatchMakingContextProvider } from "./MatchMaking.context"
import { PokemonCard } from "./PokemonCard"

const gen1Url = 'https://pokeapi.co/api/v2/generation/1'
const gent2Url = 'https://pokeapi.co/api/v2/generation/2'

export const MatchMaking = () => {
    const { isLoading, error, data } =  useQuery('pokemonList', () => {
        return Promise.all([fetch(gen1Url), fetch(gent2Url)])
            .then(([res1, res2]) => {
                if(!res1.ok || !res2.ok) {
                    throw new Error('Request failed')
                }
                return Promise.all([res1.json(), res2.json()])
            })
            .then(([data1, data2]) => {
                return [
                    ...data1.pokemon_species.map(species => ({name: species.name, generation: 1, url: species.url})),
                    ...data2.pokemon_species.map(species => ({name: species.name, generation: 2, url: species.url}))
                ]
            })
    }, [])

    const {selectedPokemon, handleTogglePokemon} = useMatchMakingContextProvider()
    const tooglePokemonSelectedFactory = (pokemonName) => () => {
        handleTogglePokemon(pokemonName)
    }

    if(isLoading) {
        // throw new Error('Une erreur sauvage apparait !');
        return (
            <section className="matchmaking">
                Chargement...
            </section>
        );
    }

    if(error) {
        return (
            <section className="matchmaking">
                Impossible de récupérer les pokémons.
                Il faut recharger la page.
            </section>
        );
    }

    const pokemons = data;

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