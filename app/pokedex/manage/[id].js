import { View, Text, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react'
import { usePokemons } from '../../providers/pokemon_provider'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import CustomTextInput from '../../components/customTextInput'
import types from '../../../assets/types.json';
import { colors, themeColors } from '../../themes/colors';
import CustomButton from '../../components/customButton';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTheme } from '../../providers/theme_provider';
import { myTheme } from '../../themes/myTheme';
import { useFavourites } from '../../providers/fav_provider';

const ManagePokemon = () => {
    const { id } = useLocalSearchParams()
    const [details, setDetails] = useState({
        image: { hi_res: null, thumbnail: null},
        name: { english: null, },
        base: { HP: ''},
        type: types[0].split(" - "),
    })

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [oldTypes, setOldTypes] = useState(true);

    const { theme } = useTheme()
    
    const { findPokemon, updatePokemon } = usePokemons();
    const { updateFavourite } = useFavourites();
 //   let oldTypes = null

    const viewDetails = async (id) => {
        const details = findPokemon(id);
        if(details){
            setOldTypes(details.type.join(" - "))
            setDetails(details)
        } else {
            setDetails(details => {
                details.id = new Date().getTime();
                return details;
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        viewDetails(id)
    }, [])

    const pickImage = async () => {
        let result = await
        ImagePicker.launchImageLibraryAsync({
            mediaTypes:
            ImagePicker.MediaTypeOptions .Images,
            allowsEditing : true,
            allowsMultipleSelection : false,
            aspect: [16, 9],
            quality: 1,
        });
        //console.log(result);
        if (!result.canceled) {

            const uri = result.assets[0].uri
        //     const imageURI = FileSystem.documentDirectory + 'pokemon_images/' + details.name.english + ".jpeg";
        //     try {
        //    //     const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'pokemon_images');
        //         console.log(uri, "fileInfo")
        //         FileSystem.copyAsync("", FileSystem.documentDirectory + 'hi_res12.jpg').then(() => { console.log('copied')})
        //     } catch (error) {
        //         console.log(error)
        //     }

            setData('image', 'hi_res', uri)
            setData('image', 'thumbnail', uri)
            //setImage();
        }
    }


    const setData = (parentKey, key, value) =>{
        setDetails(details => {
            const data = {...details}
            if(parentKey) {
                data[parentKey][key] = value
            } else {
                data[key] = value;
            }
            console.log(data)
            return data;
        })
    }

    if(loading) {
        return <ActivityIndicator />
    }
    
     return (
        <SafeAreaView style={{ flex: 1}}>
            <ScrollView style={{flex: 1, backgroundColor: themeColors[theme].container}}>
            <View style={[styles.container, ]}>
                <View style={{ display: 'flex', alignItems: 'center', gap: 15,  flexDirection: 'row', marginVertical: 25}}>
                    <TouchableOpacity  onPress={() => router.back()}>
                        <FontAwesome6 name='arrow-left' color={themeColors[theme].textColor} size={30} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: themeColors[theme].textColor}]}>ManagePokemon</Text>
                </View>
               
                <Image source={{ uri: details.image.hi_res }}  style={{  borderColor: colors.red_500, borderWidth: 2, borderRadius: 20, backgroundColor: themeColors[theme].container, width: 200, height: 200, marginStart: 'auto', marginEnd: 'auto', marginBottom: 20}}/>
                <CustomButton text='Select Image' backgroundColor={colors.red_500} icon={'image'} btnStyle={{ marginBottom: 20}} onPress={pickImage}/>

                <CustomTextInput value={details.name.english} onValueChange={(value) => setData('name', 'english', value)} title='English Name' />
                <CustomTextInput value={`${details.base.HP}`} onValueChange={(value) => setData('base', 'HP', value)} title='Base HP'/>
                <Text style={{ fontSize: 18, marginVertical: 10, color:themeColors[theme].textColor }}>Types</Text>
                <View style={{ borderRadius: 10, borderColor: colors.red_500, borderWidth: 2, marginBottom: 20}}>
                <Picker
                    selectedValue ={details.type.join(" - ")}
                    onValueChange ={(itemValue, itemIndex) => {
                        setData(null, 'type', itemValue.split(" - "));
                    }}
                    style={{
                        width: '100%',
                        height: 64,
                        // backgroundColor: 'none',
                    }
                }
                >
                    {
                        types.map((item, index) => (
                            <Picker.Item key={index} label={item} value={item}  style={{color: themeColors[theme].textColor, backgroundColor: themeColors[theme].container} }/>
                        ))
                    }
                </Picker>
                </View>
                <CustomButton text='Save' onPress={async () => 
                {  
                    let updatedData = await  updatePokemon(details, oldTypes); 
                    if(id > 0) {
                        updateFavourite(updatedData);
                    }
                    router.back() 
                }
                }   backgroundColor={colors.red_500} icon={'save'}/>
            </View>
            </ScrollView>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, paddingVertical: 5},
    title: { fontSize: 25, fontWeight: 'bold'}
})

export default ManagePokemon;