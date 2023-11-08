import { createContext, useReducer  } from "react";

export const UsersContext = createContext()

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                users: action.payload
            }
        case 'CREATE_USER':
            return {
                users: [action.payload, ...state.users]
            }
        case 'DELETE_USER':
            return {
                users: state.users.filter((w) => w._id !== action.payload._id)
            }
        case 'UPDATE_USER':
            return {
                users: state.users.map((w) => w._id === action.payload._id)
            }
        default:
            return state
    }
}

export const UsersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, {
        users: null
    })

    return (
        <UsersContext.Provider value={{...state, dispatch}}>
            { children }
        </UsersContext.Provider>
    )
}

