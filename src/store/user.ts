import {makeAutoObservable} from 'mobx'
import {IUser} from "../types/user";
import api from "../api";

class User {
    constructor() {
        makeAutoObservable(this)
    }

    /*
     * Authorization
     */

    isAuth: boolean = false
    setAuth = (state: boolean) => this.isAuth = state

    /*
     * Authorization
     */

    loading: boolean = true
    setLoading = (state: boolean) => this.loading = state

    /*
     * User
     */

    user = {} as IUser;
    setUserInformation = (data: IUser) => this.user = data

    /*
     * Actions
     */

    login = (email: string, password: string) => {
        return api.User.login(email, password).then(res => {
            this.setUserInformation(res.data)
            this.setAuth(true)
        })
    }

    registration = (email: string, phone: string, first_name: string, last_name: string, password: string) => {
        return api.User.register(email, phone, first_name, last_name, password).then(res => {
            this.setUserInformation(res.data)
            this.setAuth(true)
        })
    }

    check = () => {
        this.setLoading(true)
        const user = api.User.check()

        user.then(res => {
            this.setAuth(true)
            this.setUserInformation(res.data)
        }).catch(() => {}).finally(() => this.setLoading(false))

        return user
    }

    logout = () => {
        const data = api.User.logout()

        data.then(() => {
            this.setAuth(false)
            this.setUserInformation({} as IUser)
        })
        return data
    }
}

export default new User()