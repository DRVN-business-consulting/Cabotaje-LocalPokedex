import { StyleSheet } from "react-native";

export const myTheme = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        display: 'flex',  
        flexDirection: 'row',
    },
    column: {
        display: 'flex',  
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerAll: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    w_100: {
        width: '100%'
    },
    textWhite: {
        color: '#FFFFFF'
    },
    centerInContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});