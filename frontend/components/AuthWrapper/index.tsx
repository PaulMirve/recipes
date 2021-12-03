import { GlobalContext } from "context/GlobalContext";
import { useIsAuthenticatedQuery, User } from "generated/graphql"
import { FC, useContext, useEffect } from "react";

const AuthWrapper: FC = ({ children }) => {
    const { data } = useIsAuthenticatedQuery({
        fetchPolicy: 'no-cache'
    });
    const { setUser } = useContext(GlobalContext)

    useEffect(() => {
        if (data) {
            setUser(data.isAuthenticated as User);
        }
    }, [data])
    return (
        <>
            {children}
        </>
    )
}

export default AuthWrapper
