import { createContext } from "react"

type ContextProps = { 
    currentUser: object | null,
    isAuth: boolean,
    draft: object | null,
    viewDevice: string,
    pins: any,
    state?: any,
    dispatch?: any,
    currentPin: object | null
  };


///Global State
const Context = createContext<Partial<ContextProps>>({
    currentUser: null,
    isAuth: false,
    draft: null,
    pins: [],
    currentPin: null,
    viewDevice: window.innerWidth < 1000? "mobile": "desktop"
})

export default Context

