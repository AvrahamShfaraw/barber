import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent';
import { Appointment, AppointmentFormValues, AvailableAppointment } from "../models/appointment";
import { Profile } from "../models/profile";
import { store } from "./store";



export default class AppointmentStore {
    appointmentRegistry = new Map<string, Appointment>();
    selectedAppointment: Appointment | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    appointmentDetails = new Map<string, any>();
    availableAppointment: AvailableAppointment[] | undefined = undefined;

    constructor() {
        makeAutoObservable(this)
    }

    loadAvailableAppointment = async () => {
        this.loadingInitial = true;
        try {
            const response = await agent.Appointments.list();
            const date = new Date();
            const range = ['10:00', '10:20', '10:40', '11:00',
                '11:20', '11:40', '12:00', '12:20', '12:40',
                '13:00', '13:20', '13:40', '14:00', '14:20',
                '14:40', '15:00', '15:20', '15:40', '16:00', '16:20'
                , '16:40', '17:00', '17:20', '17:40', '18:00', '18:20',
                '18:40', '19:00', '19:20', '19:40', '20:00',
                '20:20', '20:40', '21:00'];

            const AppointmentsDate = response.map((a: { appointmentDate: string; }) => a.appointmentDate.split('T').join().slice(0, 24));

            this.availableAppointment = range.map((hour, i) => {
                var check = date.toString().split('T').join().slice(0, 16) + hour + ':00';

                return {
                    time: `${hour}`,

                    availbale:
                        AppointmentsDate.find((x: string) => x === check) ? false : true,
                    appointmentDate: check,
                    x: AppointmentsDate.find((x: string) => x === check)
                };
            });


        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }


    loadAppointments = async () => {
        this.loadingInitial = true;
        try {
            const appointments = await agent.Appointments.list();
            appointments.forEach((appointment: Appointment | undefined) => {
                this.selectedAppointment = appointment;

            })
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

    loadAppointment = async (appointmentId: string) => {
        let appointment = this.getAppointment(appointmentId)
        if (appointment) {
            this.selectedAppointment = appointment
            return appointment;
        } else {
            this.loadingInitial = true;
            try {
                appointment = await agent.Appointments.details(appointmentId);
                this.setAppointment(appointment!);
                runInAction(() => {
                    this.selectedAppointment = appointment;
                });

                this.setLoadingInitial(false);
                return appointment;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }


    private setAppointment = (appointment: Appointment) => {
        const user = store.userStore.user;
        if (user) {
            appointment.isGoing =
                appointment.attendee.userName == user.userName
                    ? true : false;
        }

        appointment.appointmentDate = appointment.appointmentDate!;
        this.appointmentRegistry.set(appointment.appointmentId, appointment);
        var event: any = {
            id: appointment.appointmentId,
            date: Date.parse(appointment.appointmentDate),
            title: appointment.attendee.userName
        }

        this.appointmentDetails.set(event.id, event);

    }
    private getAppointment = (id: string) => {
        return this.appointmentRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createAppointment = async (appointment: AppointmentFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);

        try {
            await agent.Appointments.create(appointment);
            const newAppointment = new Appointment(appointment);

            newAppointment.attendee = attendee;
            this.setAppointment(newAppointment);
            runInAction(() => {
                this.selectedAppointment = newAppointment;
            })
        } catch (error) { console.log(error); }
    }

    updateAppointment = async (appointment: AppointmentFormValues) => {
        try {
            await agent.Appointments.update(appointment);
            runInAction(() => {
                if (appointment.appointmentId) {
                    let updatedAppointment = { ...this.getAppointment(appointment.appointmentId), ...appointment }
                    this.appointmentRegistry.set(appointment.appointmentId, updatedAppointment as Appointment)
                    this.selectedAppointment = updatedAppointment as Appointment;
                }
            })
        } catch (error) {
            console.log(error);
        }

    }

    deleteAppointment = async (id: string) => {
        this.loading = true;
        try {
            await agent.Appointments.delete(id);
            runInAction(() => {
                this.appointmentRegistry.delete(id);
                this.loading = false;
                console.log(id)
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }


    cancelAppointmentToggle = async () => {
        this.loading = true;
        try {

            await agent.Appointments.attend(this.selectedAppointment!.appointmentId);
            runInAction(() => {
                this.selectedAppointment!.isCancelled = !this.selectedAppointment?.isCancelled;
                this.appointmentRegistry.set(this.selectedAppointment!.appointmentId, this.selectedAppointment!)
                console.log(this.selectedAppointment);
            })
        } catch (error) {

        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }




    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Appointments.attend(this.selectedAppointment!.appointmentId);
            runInAction(() => {
                if (this.selectedAppointment?.isGoing) {


                    this.selectedAppointment.isGoing = false;
                } else {
                    const attendee = new Profile(user!);
                    this.selectedAppointment!.attendee = attendee;
                    this.selectedAppointment!.isGoing = true;
                }
                this.appointmentRegistry.set(this.selectedAppointment!.appointmentId, this.selectedAppointment!)
            })

        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false)
        }
    }


}