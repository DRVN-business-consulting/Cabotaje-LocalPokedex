import { View, Text, Button, FlatList, SectionList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pokemon from '../components/pokemon'
import { API_URL, SAVED_POKEMON } from '../../constants'
import { useTheme } from '../../providers/theme_provider'
import { colors, themeColors, typeColors } from '../../themes/colors'
import { myTheme } from '../../themes/myTheme'
import { SafeAreaView } from 'react-native-safe-area-context'
import TypeHeader from '../components/type_header'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePokemons } from '../../providers/pokemon_provider'
import { router } from 'expo-router'
import CustomButton from '../../components/customButton'


const IndexScreen = () => {
    
    const { theme } = useTheme();

    const { loading, pokemons, getPokemons } = usePokemons(); 
    const themeColor = themeColors[theme];

    useEffect(() => {
        getPokemons()
    }, [])

    if(loading) {
        return (
        <View style={[myTheme.centerInContainer, { backgroundColor: themeColor.container}]}>
            <ActivityIndicator color={colors.red_500}/>
       </View>
       )
    } 

    //typeColors[type.toLowerCase().replaceAll(" ", "")].bg

    return (
        <SafeAreaView>
            <SectionList 
                ListHeaderComponent={() =>
                    <View>
                        <CustomButton text='New pokemon'icon='plus' btnStyle={{ marginHorizontal: 10,  marginTop: 20, marginBottom: 30}} backgroundColor={colors.red_500} onPress={() => router.push('pokedex/manage/' + -1 )}/>
                        <Text style={{ color: colors.white, fontSize: 25, textAlign: 'center', fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 10, backgroundColor: "#B71C1C"}}>List of Pokemon</Text>
                    </View>
                }
                style={{ backgroundColor: themeColor.container}}
                sections={pokemons}  
                renderSectionHeader={({ section: {type}}) => <TypeHeader type={type}/>} 
                renderItem={({ item }) => <Pokemon  pokemon={item} />}  
            />
        </SafeAreaView>
    )
}

export default IndexScreen