import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from './providers/auth_provider'
import { router } from 'expo-router';

const MainSreen = () => {
    //const { isLoggedIn } = useAuth();


  
    return (
        <View>
        <Text>MainSreen</Text>
        </View>
    )
}

export default MainSreen