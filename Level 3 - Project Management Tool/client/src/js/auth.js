import { fetchAuthToken, fetchUserData } from "./localstorage"

export const checkLoginStatus = async ()=>{
    try {
        const token = fetchAuthToken()
        const userdata = fetchUserData()

        if(!token || !userdata){
            return false
        }

        // write fetch code

        return true
    } catch (error) {
        console.error(error)
        return false
    }
}