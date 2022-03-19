import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import TextInput from "../component/TextInput";
import { UserFormValues } from "../models/user";
import { useStore } from "../stores/store";
import { stylesRegister, styles } from "../style";
import { RootStackParamList } from "../types";

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'הרשמה'>

export const RegisterScreen: React.FC<RegisterScreenProps> = (props) => {
    const { userStore } = useStore();


    const [displayName, setDisplayName] = useState({ value: '', error: '' });
    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });


    const userNameValidate = (str: string) => {
        if (str === '')
            return 'הזן שם משתמש ';

    }
    const dispalyNameValidate = (str: string) => {
        if (str === '')
            return 'הזן שם מלא ';

    }
    const phoneValidate = (str: string) => {
        if (str === '')
            return 'הזן מס טלפון';

    }
    const passwordValidate = (str: string) => {
        if (str === '')
            return 'הזן סיסמא  ';

    }

    const _onSignUpPressed = () => {
        const displayNameError = dispalyNameValidate(displayName.value);
        const phoneError = phoneValidate(phoneNumber.value);




        if (displayNameError || phoneError) {

            setDisplayName({ ...displayName, error: displayNameError! });
            setPhoneNumber({ ...phoneNumber, error: phoneError! });

            return;
        }
        var creds: UserFormValues = {
            userName: 'user' + phoneNumber.value,
            displayName: displayName.value,
            phoneNumber: phoneNumber.value,
            password: 'Pa$$w0rd' + phoneNumber.value
        }

        userStore.register(creds).then(() => props.navigation.push('תורים'));


    }

    return (
        <Background>


            <Logo />

            <Header>Create Account</Header>


            {/* <TextInput
                label="שם משתמש"
                returnKeyType="next"
                style={stylesRegister.input}
                value={userName.value}
                onChangeText={(text) => setUserName({ value: text, error: '' })}
                error={!!userName.error}
                errorText={userName.error}
                autoComplete
            /> */}

            <TextInput
                label="שם מלא"
                returnKeyType="next"
                style={stylesRegister.input}
                value={displayName.value}
                onChangeText={(text: any) => setDisplayName({ value: text, error: '' })}
                error={!!displayName.error}
                errorText={displayName.error}
                autoComplete={displayName.value.toString()}


            />
            <TextInput
                label="מס טלפון"
                returnKeyType="next"
                style={stylesRegister.input}
                value={phoneNumber.value}
                onChangeText={(text: any) => setPhoneNumber({ value: text, error: '' })}
                error={!!phoneNumber.error}
                errorText={phoneNumber.error}
                autoComplete={phoneNumber.value.toString()}
            />

            {/* <TextInput
                label="סיסמא"
                returnKeyType="next"
                style={stylesRegister.input}
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                autoComplete

            /> */}

            <Button mode="contained"
                onPress={_onSignUpPressed}
                style={styles.button}>
                Sign Up
            </Button>

            <View style={stylesRegister.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => console.log('hello')}>
                    <Text style={stylesRegister.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background >
    );
}
