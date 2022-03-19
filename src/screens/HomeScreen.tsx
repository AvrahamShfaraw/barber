import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import Background from "../component/Background";
import Button from "../component/Button";
import Logo from "../component/Logo";
import Paragraph from "../component/Paragraph";
import { RootStackParamList } from "../types";
type HomseScreenProps = NativeStackScreenProps<RootStackParamList, 'בית'>
export const HomeScreen: React.FC<HomseScreenProps> = (props) => {
    return (
        <Background>
            <Logo />

            <Paragraph>
                The easiest way to start with your amazing application.
            </Paragraph>
            <Button mode="contained" onPress={() => props.navigation.push('התחברות')}>
                לקוח קיים
            </Button>
            <Button
                mode="outlined"
                onPress={() => props.navigation.push('הרשמה')}
            >
                לקוח חדש
            </Button>
        </Background>
    )
}
