import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useFavourites } from '../../providers/fav_provider'
import Pokemon from '../components/pokemon'
import { myTheme } from '../../themes/myTheme'
import { useTheme } from '../../providers/theme_provider'
import { themeColors } from '../../themes/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const FavouritesScreen = () => {
  const { theme } = useTheme()
  const { favourites, getFavourites } = useFavourites()


  useEffect(() => {
   getFavourites() 
  }, [])

  const themeColor = themeColors[theme];
  if(favourites.length == 0){
    return (
    <View style={[myTheme.centerInContainer, {backgroundColor: themeColor.container}]}>
        <Text style={[{color: themeColor.textColor, fontSize: 20}]}>No Favourites Addet Yet.</Text>
    </View>)
  }
  return (
    <SafeAreaView style={[{ flex: 1}]}>
      <FlatList 
        data={favourites} 
        style={[{backgroundColor: themeColor.container, paddingVertical: 20}]}
        renderItem={({ item }) => <Pokemon  pokemon={item}/>}  />
    </SafeAreaView>
  )
}


export default FavouritesScreen