import { User } from "./user";

export interface Profile {
    userName: string;
    displayName: string;
    phoneNumber: string;


}
export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.phoneNumber = user.phoneNumber;



    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}