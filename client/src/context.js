import { createContext } from "react"


///Global State
const Context = createContext({
    currentUser: null,
    isAuth: false
})

export default Context

