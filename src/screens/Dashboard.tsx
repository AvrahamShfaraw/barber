import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import agent from "../api/agent";
import Background from "../component/Background";
import Button from "../component/Button";
import Header from "../component/Header";
import { AppointmentFormValues } from "../models/appointment";
import { useStore } from "../stores/store";
import uuid from 'react-native-uuid';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";



import {
    subDays,
    addDays,
    isBefore,
} from 'date-fns';
import { styles } from "../style";
import { IconButton } from "react-native-paper";
import { utcToZonedTime } from "date-fns-tz";
import Paragraph from "../component/Paragraph";
import Logo from "../component/Logo";



type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'תורים'>
export const Dashboard: React.FC<DashboardScreenProps> = (props) => {
    const { userStore } = useStore();

    const [schedule, setSchedule] = React.useState<any>([]);
    const [date, setDate] = React.useState(new Date());
    const { appointmentStore } = useStore();
    const { createAppointment, updateAppointment } = appointmentStore;
    const [loading, setLoading] = React.useState(false);
    const [isPass, setIsPass] = React.useState(false);

    const range = ['10:00', '10:20', '10:40', '11:00',
        '11:20', '11:40', '12:00', '12:20', '12:40',
        '13:00', '13:20', '13:40', '14:00', '14:20',
        '14:40', '15:00', '15:20', '15:40', '16:00', '16:20'
        , '16:40', '17:00', '17:20', '17:40', '18:00', '18:20',
        '18:40', '19:00', '19:20', '19:40', '20:00',
        '20:20', '20:40', '21:00'];



    const handleDateClick = (e: any) => {
        let newAppointment: AppointmentFormValues = {
            appointmentDate: e
        };
        handleFormSubmit(newAppointment)
    }

    function handleFormSubmit(appointment: AppointmentFormValues) {
        if (!appointment.appointmentId) {
            let newAppointment = {
                ...appointment,
                appointmentId: uuid.v4().toString(),
            };
            createAppointment(newAppointment).then(() => props.navigation.push('פרטים', {
                id: newAppointment.appointmentId,
                name: userStore.user?.displayName,
                phone: userStore.user?.phoneNumber,
                date: newAppointment?.appointmentDate


            }))

        } else {
            updateAppointment(appointment)
        }
    }

    useEffect(() => {

        async function loadAvailableAppointment() {
            const response = await agent.Appointments.list();
            const appointments = response.map((a: { appointmentDate: string; }) => a.appointmentDate.split('T').join().slice(0, 24));

            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (date.getDay() !== 6) {

                const data = range.map((hour, i) => {
                    const checkDate = Date.parse(date.toString().split('T').join().slice(0, 16) + hour + ':00');
                    const compareDate = utcToZonedTime(checkDate, timezone);

                    var check = date.toString().split('T').join().slice(0, 16) + hour + ':00';
                    const availbale = appointments.find((x: string) => x === check) ? false : true;
                    const past = isBefore(compareDate, new Date())
                    setIsPass(past);


                    if (availbale && !past && date.getDay() !== 6) {
                        return {
                            key: i,
                            time: `${hour}`,
                            day: date.getDay(),
                            availbale: availbale,
                            past: isBefore(compareDate, new Date()),
                            appointmentDate: check,
                            x: appointments.find((x: string) => x === check)
                        };

                    }


                });
                const newdata = data.filter((item) => typeof item !== 'undefined')


                if (newdata.length > 0) {
                    setSchedule(newdata);
                } else {
                    setSchedule(null);
                }


            } else {

                const data = null;
                setSchedule(data);


            }
        }

        loadAvailableAppointment();
        setLoading(true);
    }, [date]);

    function handlePrevDay() {

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const checkDate = date
        const compareDate = utcToZonedTime(checkDate, timezone);

        const past = isBefore(compareDate, new Date())
        setIsPass(past);

        if (!past && date.getDay() !== 6) {
            if (date.getDay() === 0) {
                setDate(subDays(date, 2));

            } else {
                setDate(subDays(date, 1));
            }

        }
    }

    function handleNextDay() {
        if (date.getDay() === 5) {
            setDate(addDays(date, 2));
        } else {
            setDate(addDays(date, 1));
        }

    }
    const day = date.getDay();

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
    else {
        dayheb = 'שבת'
    }



    if (!loading) return <Header>loading..</Header>

    // //format(date, 'EEEE d MMM y')
    return (
        <Background>
            <Logo />
            <View>
                <Paragraph>
                    The easiest way to start with your amazing application.
                </Paragraph>

            </View>
            <View >



                <Text style={styles.label}><IconButton icon={'arrow-left'} color={'white'} onPress={handleNextDay} />


                    {' '}{'  יום ' + dayheb}  {date.toLocaleDateString('he-IL', {
                        day: 'numeric', month: 'short'
                    }).replace(/ /g, '-')} <IconButton disabled={isPass} icon={'arrow-right'} color={'white'} onPress={handlePrevDay} />

                </Text>






            </View>
            {

                schedule !== null ? (
                    <FlatList
                        style={{
                            height: 250,

                            flexGrow: 0
                        }}
                        data={schedule}
                        renderItem={({ item }) =>
                            <ScrollView style={{
                                flex: 2,
                                flexDirection: 'column',
                                margin: 8,


                            }} >

                                {

                                    <Button onPress={() => handleDateClick(item.appointmentDate)} >
                                        <div className="event_item" key={item.key}>
                                            <div className="ei_Title">{item.time}</div>
                                        </div>
                                    </Button>

                                }
                            </ScrollView>}
                        numColumns={3}
                        scrollEnabled={true}
                    />
                ) :
                    (
                        <View style={styles.button} >
                            <Text style={styles.label}>אין תורים פנויים ביום זה. בחר מועד אחר </Text>


                        </View>
                    )

            }

        </Background >
    )
}



function setOpen(arg0: boolean) {
    return false;
}

