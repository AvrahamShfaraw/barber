import { theme } from "./core/theme";
import { StyleSheet } from 'react-native';



export const styleCalander = StyleSheet.create({

    row: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,


    },
});


export const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
        width: '100%',
    },
});

export const stylesRegister = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {

        width: '100%',
        // border: '2px soild #aaa',
        borderRadius: 4,
        margin: '8px 0',
        // boxSizing: 'border-box',
        color: '#FFFFFF',


    },
    error: {
        fontSize: 12,
        color: '#062851',
        paddingHorizontal: 4,
        paddingTop: 4,
    },
    label: {
        color: '#062851',
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export const stylesLogin = StyleSheet.create({

    input: {
        width: '100%',
        // border: '2px soild #aaa',
        borderRadius: 4,
        margin: '8px 0',

        // boxSizing: 'border-box',
        color: '#FFFFFF'

    },
    error: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },

    textArea: {
        color: 'red'
    }
});