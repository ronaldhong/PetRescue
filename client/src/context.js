import { createContext } from "react"


///Global State
const Context = createContext({
    currentUser: null,
    isAuth: false,
    draft: null,
    viewDevice: window.innerWidth < 1000? "mobile": "desktop"
})

export default Context

