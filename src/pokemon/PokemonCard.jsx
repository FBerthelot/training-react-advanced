export const PokemonCard = ({pokemon, onSelect, selected}) => {
    return (
        <label className="pokemon-card">
            <h2>{pokemon.name}</h2>

            <p>Gen {pokemon.generation}</p>

            <input type="checkbox" onChange={onSelect} checked={selected} />
        </label>
    )
}