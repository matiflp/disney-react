import { AxiosError } from 'axios';
import client from './axiosHelper';
import { CharacterInterface } from '../Interface/CharacterInterface';
import { ResponseInterface } from '../Interface/ResponseInterface';
import { AddDataInterface } from '../Interface/AddDataInterface';

interface PropsInterface {
    response?: ResponseInterface,
    character?: CharacterInterface,
    characters?: CharacterInterface[] // getAll
}

export const GetData = async (url: string, type: string = 'getAll') : Promise<PropsInterface> => {
    try {

        let response = await client.get(`api/${url}`);

        if(type === 'getById'){
            return {
                character: response.data
            }
        }
        
        return {
            characters: response.data
        }
      
    } catch (error) {
        console.log(error);     
        if(error instanceof AxiosError){
            alert(error?.response?.data.message)
            return error?.response?.data;
        }

        return ({
            response: {
                errors: ['error no identificado'],
                isSucess: false,
                message: 'Por favor intente de nuevo',
                expireDate: new Date()
            }
        });

      }
}

export const AddData = async (url: string, data: AddDataInterface) : Promise<boolean> => {
    try {
        const response = await client.post(`/api/${url}`, data);
        alert(response.data);
        return true;
    } catch (error) {
        console.log(error);
        if(error instanceof AxiosError){
            alert(error.message);
        }
        else{
            alert('No se pudo añadir el personaje.');
        }
        return false;
    }
}

interface EditProps{
    isOk: boolean,
    message?: string,
    characterUpdated?: CharacterInterface
}

export const EditData = async (url: string, data: AddDataInterface) : Promise<EditProps> => {

    try {
        const response = await client.put(`/api/${url}`, data);
        return{
            characterUpdated: response.data,
            isOk: true
        };
    } catch (error) {
        console.log(error);
        if(error instanceof AxiosError){
            return {
                isOk: false,
                message: error.message,
            };
        }

        return {
            isOk: false,
            message: 'Hubo un problema no previsto.',
        }
    }
}

export const DeleteData = async (url: string) : Promise<EditProps> => {
    try {
        const response = await client.delete(`/api/${url}`);
        return{
            isOk: true,
            message: response.data
        }
    } catch (error) {
        console.log(error);
        if(error instanceof AxiosError){
            return {
                isOk: false,
                message: error.message,
            };
        }

        return {
            isOk: false,
            message: 'Hubo un problema no previsto.',
        }
    }
}