import { createContext } from "react"

type ContextProps = { 
    currentUser: object | null,
    isAuth: boolean,
    draft: object | null,
    viewDevice: string
    state?: any,
    dispatch?: any
  };

///Global State
const Context = createContext<Partial<ContextProps>>({
    currentUser: null,
    isAuth: false,
    draft: null,
    viewDevice: window.innerWidth < 1000? "mobile": "desktop"
})

export default Context

