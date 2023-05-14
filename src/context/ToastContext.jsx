import { createContext } from "react"
import { useToast } from "@chakra-ui/react"

export const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
    const toast = useToast()

    const fireToast = (status, message) => {
        toast({
            title: `${message}`,
            variant: 'subtle',
            position: 'top-left',
            status: `${status}`,
            isClosable: true,
        })
    }

    return (
        <ToastContext.Provider value={{ fireToast }}>
            {children}
        </ToastContext.Provider>
    )
}
