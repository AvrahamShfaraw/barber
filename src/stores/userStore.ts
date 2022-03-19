import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";


export default class UserStore {
    user: User | null = null;


    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }



    login = async (creds: UserFormValues) => {

        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            // this.navigation?.navigate('Dashboard');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }


    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        // history.push('/');

    }


    getUser = async () => {

        try {

            const user = await agent.Account.current();
            runInAction(() => {
                this.user = user;
            });
        } catch (error) {
            console.log(error)
        }
    }

    register = async (creds: UserFormValues) => {
        try {

            const user = await agent.Account.register(creds);

            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            // history.push('/appointments');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.userName = name;
    }

}