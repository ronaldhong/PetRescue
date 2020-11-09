import { createContext } from "react"


///Global State
const Context = createContext({
    currentUser: null,
    isAuth: false,
    draft: null
})

export default Context

