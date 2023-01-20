import { useState } from "react"
import { StatsInfobulle } from "./StatsInfobulle"

export const PokemonCard = ({pokemon, onSelect, selected}) => {
    const [anchorElement, setAnchorElement] = useState()
    const isInfobulleOpen = !!anchorElement

    return (
        <>
            <label className="pokemon-card">
                <h2
                    onMouseEnter={(e) => {setAnchorElement(e.target)}}
                    onMouseLeave={() => {setAnchorElement()}}
                >
                    {pokemon.name}
                </h2>

                {
                    pokemon.generation === 1 ? 
                    (<details><summary>Gen 1</summary> La meilleur des génération !</details>)
                    : (<p>Gen {pokemon.generation}</p>)
                }

                <input type="checkbox" onChange={onSelect} checked={selected} />

            </label>
            {isInfobulleOpen && <StatsInfobulle isOpen={isInfobulleOpen} url={pokemon.url} anchorElement={anchorElement} />}
        </>
    )
}