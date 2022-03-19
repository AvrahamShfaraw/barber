import { Profile } from "./profile";

export interface Appointment {
    appointmentId: string
    appointmentDate: string;
    isCancelled: boolean;
    isGoing: boolean;
    attendee: Profile;
}

export interface AvailableAppointment {
    time: string;
    availbale: boolean;
    appointmentDate: string;
    x: string | undefined;
}


export class Appointment implements Appointment {
    constructor(init?: AppointmentFormValues) {
        Object.assign(this, init);
    }
}

export class AppointmentFormValues {

    appointmentId?: string
    appointmentDate?: string

    constructor(appointment?: AppointmentFormValues) {
        if (appointment) {
            this.appointmentId = appointment.appointmentId;
            this.appointmentDate = appointment.appointmentDate;

        }
    }
}