import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { API_URL } from '../../constants'
import { useTheme } from '../../providers/theme_provider'
import { themeColors } from '../../themes/colors'
import { myTheme } from '../../themes/myTheme'

const Pokemon = ({ pokemon : { id, name, image}}) => {
  const { theme } = useTheme()
  return (
    <TouchableOpacity style={[myTheme.row, styles.container]} onPress={() => router.push(`pokedex/${id}`)}>
        <Image source={{ uri: image.thumbnail}} style={{ width: 120, height: 120}}/>
        <Text style={[styles.name, {color: themeColors[theme].textColor }]}>{ name.english }</Text> 
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 20,
      marginHorizontal: 40,
      marginVertical: 15
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold'
    }
})

export default Pokemon