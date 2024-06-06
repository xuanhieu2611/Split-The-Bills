import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext()

export const transactionsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TRANSACTIONS':
            return {
                transactions: action.payload
            }
        case 'ADD_TRANSACTION':
            return {
                transactions: [...state.transactions, action.payload]
            }
        case 'DELETE_TRANSACTION':
            return {
                transactions: state.transactions.filter((item) => item.id != action.payload.id)
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(transactionsReducer, {
        transactions:[],
    })
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (inputs) => {
        const response = await axios.post("https://split-the-bills-server.vercel.app/api/users/login", inputs)
        setCurrentUser(response.data)
    }

    const logout = async () => {
        // await axios.post("http://localhost:4000/api/users/logout")
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login, logout, state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}