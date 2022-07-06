import { AxiosError } from 'axios';
import client from './axiosHelper';
import cookies from './CookiesHelper';
import { ResponseInterface } from '../Interface/ResponseInterface';

const login = async (email: string, password: string) : Promise<ResponseInterface> => {

    try {
      
      let response = await client.post('api/auth/login', {
        email: email, 
        password: password
      });

      return response.data;
    
    } catch (error) {
                
        if(error instanceof AxiosError){
          alert(error?.response?.data.message)
          return error?.response?.data;
        }

        return ({
          errors: ['error no identificado'],
          isSucess: false,
          message: 'Por favor intente de nuevo',
          expireDate: new Date()
        });
    }
};

export default login;