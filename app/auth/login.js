import { View, Text, StyleSheet, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomTextInput from '../components/customTextInput'
import { router } from 'expo-router'
import { useTheme } from '../providers/theme_provider'
import { colors, themeColors } from '../themes/colors'
import CustomButton from '../components/customButton'
import { useAuth } from '../providers/auth_provider'


const LoginScreen = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [savedPassword, setSavePassword, ] = useState('')
    const [error, setError] = useState({})
    const { theme } = useTheme();
    const { getPassword, savedLogin } = useAuth();

    const getSavePassword = async () => {
        const savePW = await getPassword()
        console.log(savePW, "")
        setSavePassword(savePW)
    }

    useEffect(() => {
        getSavePassword()
    }, [])

    const onLogin = () => {
        const error = {}

        if(username == '') {
            error.username = 'No username'
        } 

        if(password == '') {
            error.password = 'No password'
        }
        
        if((username != '' && username != 'user') || (password != '' && password != savedPassword)) {
            error.password = 'Invalid password'
        } 
        
        
        if(Object.keys(error).length == 0) {
            savedLogin(true)
            router.replace('pokedex/(tabs)')
        } else {
            setError(error)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={[styles.container, { backgroundColor: themeColors[theme].container}]}>
                <View style={{ marginHorizontal: 20}}>
                <Image source={require('../../assets/Pokeball-PNG-Photo-Image.png')} style={{ resizeMode: 'cover', width: 180, height: 180, margin: 'auto'}} />
                <CustomTextInput value={username} onValueChange={(value) => setUsername(value)} title='Username' error={error.username}/>
                <CustomTextInput value={password} onValueChange={(value) => setPassword(value)} title='Password' secureTextEntry={true} error={error.password}/>
                <CustomButton 
                    text={'LOGIN'} 
                    backgroundColor={colors.red_500}
                    icon={'right-to-bracket'}
                    btnStyle={{ marginTop: 20 }}
                    onPress={onLogin}
                />
                {/* <Button title='LOGIN' onPress={}/> */}
                </View>
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        width: '100%'
    }
})

export default LoginScreen