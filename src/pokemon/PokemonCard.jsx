export const PokemonCard = ({pokemon}) => {
    return (
        <article className="pokemon-card">
            <h2>{pokemon.name}</h2>

            <p>Gen {pokemon.generation}</p>
        </article>
    )
}