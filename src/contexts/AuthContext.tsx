import { createContext } from 'react'

interface AuthContextInterface {
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export default AuthContext;