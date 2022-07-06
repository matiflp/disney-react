import  { useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext'

const NavBar = () => {

    const data = useContext(AuthContext);

    const handleLogout = () => {
        data?.setIsAuth(false);
    }

    return (
        <nav className='navbar navbar-dark  mb-4' style={{backgroundColor: '#303134'}}>
            <div className='container'>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className='navbar-brand'>
                        <h2>API de Disney</h2>
                    </span>            
                </Link>
                { data?.isAuth 
                    ?    <h3 className='text-white-50'>
                            {`Bienvenido!`}
                            <button className='btn btn-outline-secondary ms-2' onClick={handleLogout}>Cerrar Sesion</button>
                        </h3>
                    :   <div>    
                            <Link to='login'>
                                <button className='btn btn-outline-secondary me-2'>Iniciar Sesion</button>
                            </Link>
                            <Link to='register'>
                                <button className='btn btn-outline-secondary'>Registrarse</button>
                            </Link>
                        </div>
                }
            </div>
        </nav>
    )
}

export default NavBar