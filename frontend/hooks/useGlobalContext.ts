import { GlobalContext } from "context/GlobalContext"
import { useContext } from "react"

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    return context;
}