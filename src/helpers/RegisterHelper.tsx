import { AxiosError } from 'axios';
import client from './axiosHelper';

const registro = async (userName: string, email: string, password: string, confirmPassword: string) => {

    try {
      let response = await client.post('api/auth/register', {
        userName,
        email, 
        password,
        confirmPassword
      });
      
      return response.data;
    
    } catch (error) {
                
        if(error instanceof AxiosError){
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

export default registro;