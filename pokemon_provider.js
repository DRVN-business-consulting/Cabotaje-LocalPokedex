
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { API_URL, SAVED_POKEMON } from "../constants";
import axios from "axios";
const PokemonContext = createContext([]);

export function PokemonContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [pokemons, setPokemons] = useState([]);

    const downloadImages = async (data) => {
        //console.log(data, 'data')
        const imagesDirUri = FileSystem.documentDirectory + 'pokemon_images';
        await FileSystem.makeDirectoryAsync(imagesDirUri, { intermediates: true });
        const name = data.name.english.toLowerCase();
        const image = data.image;
  
        const highRes = await FileSystem.downloadAsync(
            `${API_URL}${image.hi_res}`,
            FileSystem.documentDirectory + 'pokemon_images/' + name + '_hi_res.png'
        );
       
        const thumRes = await FileSystem.downloadAsync(
            `${API_URL}${image.thumbnail}`,
            FileSystem.documentDirectory + 'pokemon_images/' + name + '_thumbnail.png'
        );

        data.image = { hi_res: highRes.uri, thumbnail: thumRes.uri }
        return data;
    };

    const getPokemons = async() => {
        setLoading(true);
        let pokemonList = [];
        const savePokemon = await AsyncStorage.getItem(SAVED_POKEMON)
        if(! savePokemon) {
            try {
                const { data } = await axios.get(`${API_URL}/pokemon`)
                for (const item of data) {
                    const types = item.type.join(" - ")
                    const group =  pokemonList.find((item) => item.type == types)
                    const updatedItem = await downloadImages(item);
                    if(group == null) {
                        pokemonList.push({
                            type: types,
                            data: [ updatedItem ]
                        })
                    } else if(group.data.findIndex(data => data.id == item.id) < 0){
                        group.data.push(updatedItem)
                    }
                  //  console.log('save')
                    if(pokemonList.length == 10) break;
                }
                savePokemons(pokemonList);
            } catch(e){
                console.log(e)
            }
        } else {
            pokemonList = JSON.parse(savePokemon);
        }

        setPokemons(pokemonList)
        setLoading(false);
    }

    const savePokemons = (pokemons) => {
        AsyncStorage.setItem(SAVED_POKEMON, JSON.stringify(pokemons))   
    }

    const removePokemon = async (id) => {
        if(pokemons.length > 0) {
            setPokemons(pokemons => {
                const pokemonsToUpdate = [...pokemons];
                for (const pokemon of pokemonsToUpdate) {
                    const index = pokemon.data.findIndex(data => data.id == id)
                    if(index !== -1) {
                        pokemon.data.splice(index, 1)
                        break;
                    }
                }
                savePokemons(pokemonsToUpdate);
                return pokemonsToUpdate;
            })
        }
    }

    const findPokemon = (id) => {
       
        if(pokemons.length > 0 && id > 0){
            for (const pokemon of pokemons) {
                const item = pokemon.data.find(data => data.id == id)
              //  console.log(item, "ss")
                if(item) {
                    return item;
                }
            }
        }
        return null
    }

    const updatePokemon =  async (details, oldTypes, callback) => {
        const name = details.name.english;
      
      //  const imageURI = FileSystem.documentDirectory + 'pokemon_images/' + details.name.english + "_" + new Date().getTime() + ".png";
        const hiURI =   FileSystem.documentDirectory + 'pokemon_images/' + name + '_hi_res.png'
        const thumbURI =   FileSystem.documentDirectory + 'pokemon_images/' + name + '_thumbnail.png'
      
        try {
            await FileSystem.copyAsync({ from: details.image.hi_res, to: hiURI})
            await FileSystem.copyAsync({ from: details.image.thumbnail, to: thumbURI})
        } catch (error) {
            console.log(error)
        }
        details.image = { hi_res: hiURI, thumbnail: thumbURI};
       // console.log(details.image, "image")

        setPokemons(pokemons => {
            const pokemonsToUpdate = [...pokemons];
            const currentTypes = details.type.join(" - ");
            //const isNewTypes = currentTypes != oldTypes

            let remove = oldTypes == "";
            let upsert = false;

            // console.log(currentTypes, "")

            // console.log(currentTypes, oldTypes);
            for (const pokemon of pokemonsToUpdate) {
               
                if(pokemon.type == oldTypes && currentTypes != oldTypes) {
                    
                    const index = pokemon.data.findIndex(data => data.id == details.id)
                    if(index !== -1) {
                        pokemon.data.splice(index, 1)
                        remove = true
                    }
                }

                if(pokemon.type == currentTypes) {
                    
                    const index = pokemon.data.findIndex(data => data.id == details.id)
                    if(index !== -1) {
                        pokemon.data.splice(index, 1, details)
                    } else {
                        console.log(details)
                        pokemon.data.splice(pokemon.data.length, 0, details)
                    }
                    upsert = true
                }

                if(upsert && remove) {
                    break;
                }
            }
            savePokemons(pokemonsToUpdate);
            //callback()
            return pokemonsToUpdate;
        })

        return details;
    }

    return (
        <PokemonContext.Provider value={{getPokemons, loading, pokemons, findPokemon, updatePokemon, removePokemon}}>
            {children}
        </PokemonContext.Provider>
    );
}

export function usePokemons() {
    return useContext(PokemonContext);
}

