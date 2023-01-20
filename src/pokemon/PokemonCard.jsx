export const PokemonCard = ({pokemon, onSelect, selected}) => {
    return (
        <label className="pokemon-card">
            <h2>{pokemon.name}</h2>

            {
                pokemon.generation === 1 ? 
                (<details><summary>Gen 1</summary> La meilleur des génération !</details>)
                : (<p>Gen {pokemon.generation}</p>)
            }

            <input type="checkbox" onChange={onSelect} checked={selected} />
        </label>
    )
}