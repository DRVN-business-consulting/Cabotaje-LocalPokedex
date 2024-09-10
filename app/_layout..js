import { Stack } from 'expo-router'
import { ThemeContextProvider } from './providers/theme_provider'
import { AuthContextProvider } from './providers/auth_provider';
import { FavouriteContextProvider } from './providers/fav_provider'
import { PokemonContextProvider } from './providers/pokemon_provider'

const AppLayout = () => {
  return (
    <ThemeContextProvider>
         <AuthContextProvider>
        <PokemonContextProvider>
            <FavouriteContextProvider>
                <Stack>
                     <Stack.Screen
                        name='index'
                        options={
                            {
                                headerShown: false
                            }
                        }
                    />
                    <Stack.Screen
                        name='auth/login'
                        options={
                            {
                                headerShown: false
                            }
                        }
                    />
                   
                    <Stack.Screen
                        name='pokedex/(tabs)'  
                        options={
                            {
                                headerShown: false,
                            }
                        } 
                    />
                    <Stack.Screen
                        name='pokedex/[id]'
                        options={
                            {
                                title: 'View Pokemon',
                            headerShown: false,
                            }
                        } 
                    />
                    <Stack.Screen
                        name='pokedex/manage/[id]'
                        options={
                            {
                                title: 'Manage Pokemon',
                                headerShown: false,
                            }
                        } 
                    />
                </Stack>
            </FavouriteContextProvider>
          
        </PokemonContextProvider>
        </AuthContextProvider>
    </ThemeContextProvider>
  )
}

export default AppLayout