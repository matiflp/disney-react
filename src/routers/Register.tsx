import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext"
import { ResponseInterface } from "../Interface/ResponseInterface";
import registro from "../helpers/RegisterHelper";
import Spinner from "../components/Spinner";
import './Styles.css';

interface RegisterInterface {
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
}

const initialRegister = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Register = () => {

  const [register, setRegister] = useState<RegisterInterface>(initialRegister);
  const [ isRegisterLoading, setIsRegisterLoading] = useState(false);
  const data = useContext(AuthContext);

  const handleChange = (property: string, newValue: string) => {
    setRegister({
      ...register,
      [property]: newValue
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsRegisterLoading(true);
    const { isSucess, message }: ResponseInterface = await registro(register.userName, register.email, register.password, register.confirmPassword)
    setIsRegisterLoading(false);
    
    if (message === 'Usuario creado correctamente'){
        alert(message);
        data?.setIsAuth(true);
    }
    else{
        alert(message);
    }
  }

  return (
    <div className="container registro text-white-50">
      <h3 className="mb-4">Registrarse</h3>
      {
        isRegisterLoading 
        ?
          <div className='spinner'>
            <Spinner />
          </div>  
        :
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="inputName">
                Nombre de usuario
              </label>
                <input type="text" id="inputName" className="form-control" onChange={(e) => handleChange('userName', e.target.value)} aria-describedby="userNameHelp" />
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="inputEmail">
                Direccion de Email
              </label>
                <input type="email" id="inputEmail" className="form-control" onChange={(e) => handleChange('email', e.target.value)} aria-describedby="emailHelp" />
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="inputPassword">
                Contraseña
              </label>
                <input type="password" id="inputPassword" onChange={(e) => handleChange('password', e.target.value)} className="form-control" />
            </div>
            <div className="form-group mb-4">
              <label className="form-label" htmlFor="inputConfirm">
                Confirme Contraseña
              </label>
                <input type="password" id="inputConfirm" onChange={(e) => handleChange('confirmPassword', e.target.value)} className="form-control" />
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

export default Register;