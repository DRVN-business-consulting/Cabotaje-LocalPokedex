import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { myTheme } from '../themes/myTheme'
import { colors } from '../themes/colors';

const CustomButton = ({ 
    onPress, 
    text, 
    icon = null, 
    backgroundColor, 
    textStyle = {}, 
    btnStyle = {} }) => {
  return (
    <TouchableOpacity 
        style={
            [
                myTheme.row, myTheme.centerAll, 
                styles.btn,
                btnStyle,                
            {backgroundColor: backgroundColor}]
        }
        onPress={onPress}>
        <Text style={[myTheme.textWhite,  styles.btnText, textStyle]}>{ text }</Text>
        { icon &&  <FontAwesome6 name={icon} color={colors.white} solid size={22} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn : { paddingHorizontal: 22,   borderRadius: 10, paddingVertical: 12, },
    btnText: { fontSize: 20, marginEnd: 15, textTransform: 'uppercase'}
})

export default CustomButton