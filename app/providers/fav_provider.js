
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVOURITE_POKEMONS } from "../constants";
const FavouriteContext = createContext([]);

export function FavouriteContextProvider({children}) {
    const [favourites, setFavourites] = useState([]);

    const getFavourites = async () => {
        const favs = await AsyncStorage.getItem(FAVOURITE_POKEMONS)
        if(favs) {
         
            setFavourites(JSON.parse(favs));
              console.log(favs, "fa1")
        }
    }

    const updateFavourites = async(newFavs) => {
        await AsyncStorage.setItem(FAVOURITE_POKEMONS, JSON.stringify(newFavs));
    }

    const isFavourite = (id) => {
        return favourites.findIndex(item => item.id == id) > -1;
    }

    const updateFavourite = async(data) => {
        if(! isFavourite(data.id))  return false
        setFavourites( (prevItems) => { 
            const newFavs = prevItems.map((value) => value.id == data.id? data : value)
            console.log(newFavs);
            updateFavourites(newFavs);
            return newFavs;
        })
    }

    const removeFavourite = (id) => {
        setFavourites( (prevItems) => { 
            const newFavs = prevItems.filter((value) => value.id != id );
             updateFavourites(newFavs);
            return newFavs;
        })
    }

    const toggleFavourite = async (data) => {
        const id = data.id
        const existed = isFavourite(id)
        if(existed) {
            removeFavourite(id);
        } else {
            setFavourites( (prevItems) => { 
                const newFavs = [...prevItems, data];
                 updateFavourites(newFavs);
                return newFavs;
            })
        }
      //  console.log(favourites)
        
    }

    return (
        <FavouriteContext.Provider value={{favourites, getFavourites, isFavourite, toggleFavourite, updateFavourite, removeFavourite}}>
            {children}
        </FavouriteContext.Provider>
    );
}

export function useFavourites() {
    return useContext(FavouriteContext);
}

