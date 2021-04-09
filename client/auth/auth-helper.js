import { signout } from './api-auth'

const auth = {
    authenticate(jwt, cb) {
        if(typeof window !== "undefined") {
            sessionStorage.setItem("jwt", JSON.stringify(jwt))
        }
        cb()
    },
    isAuthenticated() {
        if(typeof window == "undefined") return false

        if(sessionStorage.getItem("jwt"))
            return JSON.parse(sessionStorage.getItem("jwt"))
        else return false
    },
    clearJwt() {
        if(typeof window !== "undefined") {
            sessionStorage.removeItem("jwt")
        }

        signout().then(data => {
            document.cookie = `t=; expires=${new Date}`
        })
    }
}

export default auth