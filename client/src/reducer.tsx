export default function reducer(state, action){
    switch(action.type){
        case "LOGIN_USER":
            return {
                ...state,
                currentUser: action.payload
            };
        case "IS_LOGGED_IN":
            return {
                ...state,
                isAuth: action.payload
            };
        case "LOGOUT_USER":
            return {
                ...state,
                currentUser: null,
                isAuth: false
            }
        case "CREATE_DRAFT":
            return {
                ...state,
                draft: {
                    latitude: 0,
                    longitude: 0
                }
            }
        case "UPDATE_DRAFT_LOCATION":
            return {
                ...state,
                draft:{
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude
                }
            }
        case "DELETE_DRAFT":
            return {
                ...state,
                draft: null
            }
        case "UPDATE_VIEW_DEVICE":
            return {
                ...state,
                viewDevice: action.payload
            }
        case "GET_PINS":
            return {
                ...state,
                pins: action.payload
            }
        case "CREATE_PIN":
            const newPin = action.payload;
            const prevPins = state.pins.filter(pin => pin._id !== newPin._id)
            return {
                ...state,
                pins: [...prevPins, newPin]
            }
        default:
            return state;
    }
}