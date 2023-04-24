import { createContext, useState } from "react"

export const UserContext = createContext({
    user: {
        nik: '',
        nama: '',
        divisi: '',
    },
    setUser: () => {}
})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState()

    return (
        <UserContext.Provider
        value={{
            user,
            setUser: (user) => {
                setUser(user)
            }
        }}
        >
        <div>{children}</div>
        </UserContext.Provider>
    )
}