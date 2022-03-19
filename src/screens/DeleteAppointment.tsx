import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import Background from "../component/Background";
import Button from "../component/Button";
import Logo from "../component/Logo";
import Paragraph from "../component/Paragraph";
import { useStore } from "../stores/store";
import { RootStackParamList } from "../types";
type DeleteScreenProps = NativeStackScreenProps<RootStackParamList, 'ביטול'>
export const DeleteScreen: React.FC<DeleteScreenProps> = (props) => {

    const { appointmentStore } = useStore();

    const { deleteAppointment } = appointmentStore;
    return (
        <Background>
            <Logo />
            <Paragraph>
                לביטול התור וחזרה לבחירת תור חדש לחץ על אישור. אחרת לחץ ביטול
                <Button>
                    <Text>{props.route.params.date}</Text>
                </Button>
            </Paragraph>


            <Button mode="outlined" onPress={() => deleteAppointment(props.route.params.id).then(() => props.navigation.push('תורים'))}>
                אישור
            </Button>
            <Button
                mode="outlined"
                onPress={() => props.navigation.goBack()}
            >
                ביטול
            </Button>
        </Background>
    )
}
