import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import MainSreen from './main';
import { useEffect } from 'react';
import { useAuth } from './providers/auth_provider';

export default function AppWrapper() {
  const { login } = useAuth()

  useEffect(() => {
    setTimeout(() => {
      console.log(login, "sddd")
      if(login != null)  router.replace(login? 'pokedex/(tabs)' :'auth/login')
    })
   
  }, [login])
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
