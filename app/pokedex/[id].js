import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Button, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { colors, themeColors, typeColors } from '../themes/colors'
import { API_URL, SAVED_POKEMON } from '../constants'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { myTheme } from '../themes/myTheme'
import { useFavourites } from '../providers/fav_provider'
import CustomButton from '../components/customButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../providers/theme_provider'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePokemons } from '../providers/pokemon_provider'

const ViewPokemon = () => {

    const { id } = useLocalSearchParams()
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(true);
    const [ typeColor, setTypeColor  ] = useState({});

    const { findPokemon, removePokemon } = usePokemons();
    const { isFavourite, toggleFavourite, removeFavourite } = useFavourites()
    const { theme } = useTheme()

    
    const viewDetails = async (id) => {
        const details = findPokemon(id);
        if(details){
            console.log(details.type, details.name, "details");
            setTypeColor(typeColors[details.type.join("-").toLowerCase()]||typeColors.others)
            setDetails(details)
            setLoading(false)
        }
    }
    
    useFocusEffect(() => {
        setLoading(true)
        viewDetails(id)
    })

    if(loading) {
        return <ActivityIndicator />
    }
    
 

    const onRemovePokemon = async (id) => {
        await removePokemon(id);
        removeFavourite(id);
        router.back();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.container, { backgroundColor: typeColor.bg}]}>
                <View style={[myTheme.row]}>
                    <TouchableOpacity style={{ marginVertical: 15}} onPress={() => router.back()}>
                        <FontAwesome6 name='arrow-left' color={colors.white} size={30} />
                    </TouchableOpacity>
                    <View style={[myTheme.row, { marginLeft: 'auto', gap: 25}]}>
                        <TouchableOpacity style={{ marginVertical: 15}} onPress={() => router.push('pokedex/manage/' + details.id )}>
                            <FontAwesome6 name='pencil' color={colors.white} size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginVertical: 15}} onPress={() => onRemovePokemon(id)}>
                            <FontAwesome6 name='trash' color={colors.white} size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <Image source={{ uri: details.image.hi_res}}   style={[styles.image, { borderColor: typeColor.foreColor, backgroundColor: themeColors[theme].container}]}  />
                    <CustomButton 
                        text={`${isFavourite(details.id)? 'Remove' :'Add'} to Favourite`} 
                        icon={'heart'}
                        backgroundColor={typeColor.foreColor}
                        onPress={() => toggleFavourite(details)}
                    />
                    <View style={{ alignSelf: 'start', marginTop: 15}}>
                    {
                        Object.entries(details.name).map(([key, value]) => {
                            return  (
                                <View style={styles.sectionContainer} key={key}>
                                    <Text style={[myTheme.textWhite, { fontWeight: 'bold', textTransform: 'capitalize', fontSize: 20, }]}>{`${key}:`}</Text>
                                    <Text style={[myTheme.textWhite, { fontSize: 20}]}>{`${value}`}</Text>
                                </View>
                            )
                        })
                    }
                    </View>
                    <Text style={[styles.section, { color: typeColor.foreColor, marginTop: 20}]}>BASE</Text>
                    <View style={{ alignSelf: 'start'}}>
                    {
                        Object.entries(details.base).map(([key, value]) => {
                            return  (
                                <View style={styles.sectionContainer} key={key}>
                                    <Text style={[myTheme.textWhite, { fontWeight: 'bold', textTransform: 'capitalize', fontSize: 20, }]}>{`${key}:`}</Text>
                                    <Text style={[myTheme.textWhite, { fontSize: 20}]}>{`${value}`}</Text>
                                </View>
                            )
                        })
                    }
                    </View>
                    <Text style={[styles.section, { color: typeColor.foreColor,  marginTop: 20}]}>TYPE</Text>
                    {
                        details.type.map(type =>  <Text key={type} style={[myTheme.textWhite, { fontSize: 20}]}>{`${type}`}</Text> )
                    }

                    { details.profile && <Text style={[styles.section, { color: typeColor.foreColor,  marginTop: 20}]}>ABILITIES</Text> }
                    {
                        details.profile && details.profile.ability.map(ability =>  <Text key={ability[0]} style={[myTheme.textWhite, { fontSize: 20}]}>{`${ability[0]}`}</Text> )
                    }
                </ScrollView>   
            </View>
        </SafeAreaView>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    section: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    sectionContainer: { display: 'flex',  flexDirection: 'row', columnGap: 10},
    image: { 
        width: '100%', borderRadius: 20, 
        borderWidth: 5, height: 250, alignSelf: 'center', 
        marginBottom: 15, backgroundColor: 'white',  resizeMode: 'contain'
    }
})

export default ViewPokemon