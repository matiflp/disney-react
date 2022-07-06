import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import AuthContext from '../contexts/AuthContext';
import cookies from '../helpers/CookiesHelper';
import login from '../helpers/LoginHelper'
import { ResponseInterface } from '../Interface/ResponseInterface';
import './Styles.css'

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setpassword ] = useState('');
    const [ isloginLoading, setIsLoginLoading] = useState(false);
    const data = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoginLoading(true);
        const { message }: ResponseInterface = await login(email, password);
        setIsLoginLoading(false);
        if (message === 'Usuario Logueado!'){
            alert(message);

            console.log('AspNetCore.Session ', cookies.get('.AspNetCore.Session'));
            console.log('Todas las Cookies: ', cookies.getAll());

            data?.setIsAuth(true);
        }
        else{
            alert(message);
        }
    }

    return (
        <div className="container login text-white-50">
            <h3 className='mb-4'>Login</h3> 
            {
                isloginLoading 
                ? 
                    <div className='spinner'>
                        <Spinner />
                    </div>      
                :
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group mb-2">
                            <label htmlFor='inputEmail'>
                                Direccion de Email:
                            </label>
                                <input type="email" id='inputEmail' className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese el Email"></input>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor='inputPassword'>
                                Contraseña:
                            </label>
                                <input type="password" id='inputPassword' className="form-control" onChange={(e) => setpassword(e.target.value)} placeholder="Ingrese una contraseña"></input>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-outline-light btn-sm">Submit</button>
                        </div>
                    </form>
            }
            {
                data?.isAuth && <Navigate to='/' />
            }
        </div>
    )
  }
  
  export default Login
