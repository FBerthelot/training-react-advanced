import { createContext, useContext, useState } from "react";

const MatchMakingContext = createContext()

export const MatchMakingContextProvider = MatchMakingContext.Provider
export const useMatchMakingContextProvider = () => useContext(MatchMakingContext)

export const useMatchMakingData = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([])

  return {
    selectedPokemon,
    handleTogglePokemon: (pokemonName) => {
        setSelectedPokemon(selectedPokemon => {
            if(selectedPokemon.includes(pokemonName)) {
                return selectedPokemon.filter(name => name !== pokemonName);
            }
            return [...selectedPokemon, pokemonName];
      })
    } 
  }
}