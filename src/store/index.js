import React, { useReducer, createContext } from 'react'
import reducer from '../reducers/index'
import firebase from 'firebase/app';
import "firebase/firestore";

const initialState = {
    user_data: []
}

firebase.initializeApp(firebaseConfig);

export const Store = createContext({
    globalState: initialState,
    setGlobalState: () => null
})
const StoreProvider = ({ children }) => {
    const [globalState, setGlobalState] = useReducer(reducer, initialState)
    return (
        <Store.Provider value={{ globalState, setGlobalState }}>
            {children}
        </Store.Provider>
    )
}
export default StoreProvider