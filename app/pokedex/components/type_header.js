import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { typeColors } from '../../themes/colors'

const TypeHeader = ({ type }) => {
  const typeColor = typeColors[type.toLowerCase().replaceAll(" ", "")]||typeColors.others
  return   <Text style={[styles.header, { backgroundColor: typeColor.bg}]}>{type}</Text>
}

const styles = StyleSheet.create({
  header: { 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    textAlign: 'center', 
    borderRadius: 20, 
    marginVertical: 20,  
    marginHorizontal: 15, 
    color: 'white', 
    fontSize: 20
  }
})

export default TypeHeader