import { AddData } from '../helpers/DataHelper';
import { useContext, useState } from 'react';
import { AddDataInterface } from '../Interface/AddDataInterface'
import Spinner from '../components/Spinner';
import { Navigate } from 'react-router-dom';
import './Styles.css';
import AuthContext from '../contexts/AuthContext';
 
const initialData: AddDataInterface = {
    image: '',
    name: '',
    age: 0,
    history: '',
    weight: 0.0
}

export const Add = () => {

    const [data, setData] = useState<AddDataInterface>(initialData);
    const [isCharacterLoading, setIsCharacterLoading] = useState(false);
    const [ isReady , setIsReady] = useState(false);

    const dataContext = useContext(AuthContext);

    const handleChanges = (type: string, value: string | number) => {
        setData({
            ...data,
            [type]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsCharacterLoading(true);
        const response = await AddData('characters', data);
        setIsCharacterLoading(false);

        if(response){
            setIsReady(true);
        }
    }

  return (
    <div className='container add text-white-50'>
        {
            !dataContext?.isAuth 
            ?
                <Navigate  to='/' />
            :
                <div>
                    <h3 className='mb-4'>Añadir un personaje</h3>
                {
                    isCharacterLoading
                    ?
                        <div className='spinner'>
                            <Spinner />
                        </div>  
                    :
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className='form-group mb-3' >
                                <label htmlFor='inputName' className='form-label'>
                                    Nombre del Personaje
                                </label>
                                <input id='inputName' onChange={(e) => handleChanges('name', e.target.value)} className='form-control' type='text'/>
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor="inputImage">
                                    Imagen del Personaje (En base64)
                                </label>
                                <input type="text" id='inputImage' className='form-control' onChange={(e) => handleChanges('image', e.target.value)} name='disneyImage' />
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='inputAge' className='form-label'>
                                    Edad
                                </label>
                                <input  id='inputAge' onChange={(e) => handleChanges('age', e.target.value)} className='form-control' type=''/>
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='inputWeight' className='form-label'>
                                    Weight
                                </label>
                                <input  id='inputWeight' onChange={(e) => handleChanges('weight', e.target.value)} className='form-control' type='number'/>
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='inputHistory' className='form-label'>
                                    Descripción
                                </label>
                                <textarea rows={5} cols={70} onChange={(e) => handleChanges('history', e.target.value)} placeholder='Enter details here...' name = "description">
                                    
                                </textarea>            
                            </div>
                            <div className="d-grid gap-2 ">
                            <button type="submit" className="btn btn-outline-light btn-sm">Submit</button>
                            </div>
                        </form>   
                }
                {
                    isReady && <Navigate  to='/' />
                }
                </div>
                
        }
        
    </div>
    
  )
}
