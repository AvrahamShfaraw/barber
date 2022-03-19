import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import BackButton from "../component/BackButton";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import Logo from "../component/Logo";
import Paragraph from "../component/Paragraph";
import { useStore } from "../stores/store";
import { styles } from "../style";
import { RootStackParamList } from "../types";
type DetailsAppointmentScreenProps = NativeStackScreenProps<RootStackParamList, 'פרטים'>

export const DetailsAppointment: React.FC<DetailsAppointmentScreenProps> = (props) => {

    const { appointmentStore } = useStore();
    const { deleteAppointment } = appointmentStore;

    const event = new Date(props.route.params.date!.slice().slice(0, 15))
    const day = event.getDay();
    var dayheb = '';
    if (day === 0) {
        dayheb = 'ראשון';
    }
    else if (day === 1) {
        dayheb = 'שני'
    }
    else if (day === 2) {
        dayheb = 'שלישי'
    }
    else if (day === 3) {
        dayheb = 'רביעי'
    }
    else if (day === 4) {
        dayheb = 'חמישי'
    }
    else if (day === 5) {
        dayheb = 'שישי'
    }





    return (
        <Background>




            <Header>{props.route.params.name}</Header>
            <Paragraph>
                <Text style={styles.label}>{props.route.params.phone}</Text>
            </Paragraph>
            <Paragraph>
                <Text style={styles.label}>{event.toLocaleDateString()}</Text>
            </Paragraph>
            <Paragraph>
                <Text style={styles.label}>{props.route.params.date?.split('').slice(16, 21)}</Text>
            </Paragraph>

            <Paragraph>
                <Text style={styles.label}>יום  {dayheb}</Text>
            </Paragraph>
            <Button mode="contained" onPress={() => props.navigation.push('פרופיל')}>
                אישור
            </Button>
            <Button
                mode="outlined"
                onPress={() => deleteAppointment(props.route.params.id).then(() => props.navigation.goBack())}
            >
                ביטול
            </Button>




        </Background>
    );





}