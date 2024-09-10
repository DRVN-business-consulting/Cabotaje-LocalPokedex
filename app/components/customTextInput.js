import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { colors, themeColors } from '../themes/colors'
import { useTheme } from '../providers/theme_provider'

const CustomTextInput = ({ value, onValueChange, title,  secureTextEntry = false, error}) => {
  const { theme } = useTheme();
  const textColor = themeColors[theme].textColor
  return (
    <View>
      <Text style={{ fontSize: 18, marginVertical: 10, color:textColor }}>{title}</Text>
      <TextInput style={[style.inputs, { color: textColor}]} value={value} onChangeText={onValueChange} secureTextEntry={secureTextEntry} />
      { error && <Text style={style.error}>{ error }</Text> }
    </View>
  )
}


const style = StyleSheet.create({
  inputs : {
    borderColor: colors.red_500,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  error: {
    color: colors.error,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5
  }
})
export default CustomTextInput