
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { IS_LOGGEDIN, SAVED_PASSWORD, SHIFT } from "../constants";
import { shiftDecrypt, shiftEncrypt } from "../utils/CaesarShift";
const AuthContext = createContext(null);

export function AuthContextProvider({children}) {
    const [login, setLogin] = useState(null);

    const setPassword = async (password) => {
        const encrypted = shiftEncrypt(password, SHIFT)
        await SecureStore.setItemAsync(SAVED_PASSWORD, encrypted);
        return encrypted;    
    }

    const getPassword = async () => {
        try {
       let pw = await SecureStore.getItemAsync(SAVED_PASSWORD)
       if(! pw) {
            pw = await setPassword('12345')
       }
       return shiftDecrypt(pw, SHIFT);
    } catch(e) {
        console.log(e, "getPassword")
    }
    }
    
    const savedLogin = async (value) =>  {
        try { 
         await AsyncStorage.setItem(IS_LOGGEDIN, String(value));
        setLogin(value);
    } catch(e) {
        console.log(e, "saveLogin")
    }
    }

    const getLogin = async () => {
        try {
        const login =  await AsyncStorage.getItem(IS_LOGGEDIN);
        setLogin(login == "true");
        } catch(e) {
            console.log(e, "getLogin")
        }
    }


    useEffect(() => {
       getLogin()
    }, [])
    
    return (
        <AuthContext.Provider value={{login, savedLogin, getPassword}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

