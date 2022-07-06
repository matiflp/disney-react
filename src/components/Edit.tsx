import React, { useCallback, useEffect, useState } from 'react';
import { EditData, GetData } from '../helpers/DataHelper';
import Spinner from './Spinner';
import '../routers/Styles.css';
import { CharacterInterface } from '../Interface/CharacterInterface';
 
interface Props {
    character: CharacterInterface;
    setCharacterUpdate: (newCharacter: CharacterInterface) => void;
    closeModal: () => void;
}

export const Edit: React.FC<Props> = ({ character, setCharacterUpdate, closeModal }) => {

    const [data, setData] = useState<CharacterInterface>(character);
    const [isCharacterLoading, setIsCharacterLoading] = useState(false);

    const updateCharacter = useCallback( async () => {

        setIsCharacterLoading(true);
        const response = await GetData(`characters/${character.id}`, 'getById');
        setIsCharacterLoading(false);

        if(response?.character){
            setData(response.character);
        }
        else if(response?.response){
            alert(response.response.message);  
        };
    }, [character.id]);

    useEffect(() => {
        updateCharacter();

    }, [updateCharacter]);

    const handleChanges = (type: string, value: string | number) => {
        setData({
            ...data,
            [type]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsCharacterLoading(true);
        const response = await EditData(`characters/${character.id}`, data);
        setIsCharacterLoading(false);

        if(response.isOk && response?.characterUpdated){
            setCharacterUpdate(response.characterUpdated);
            closeModal();
            alert('Personaje Modificado');
        }
        else{
            alert(response.message);
        }
    }

  return (
    <div className='container edit text-white-50'>
        <h3 className='h3-right mb-4'>Editar un personaje</h3>
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
                        <input id='inputName' value={data.name} onChange={(e) => handleChanges('name', e.target.value)} className='form-control' type='text'/>
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
                        <input  id='inputAge' value={data.age} onChange={(e) => handleChanges('age', e.target.value)} className='form-control' type=''/>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='inputWeight' className='form-label'>
                            Weight
                        </label>
                        <input  id='inputWeight' value={data.weight} onChange={(e) => handleChanges('weight', e.target.value)} className='form-control' type='number'/>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='inputHistory' className='form-label'>
                            Descripción
                        </label>
                        <textarea rows={5} cols={70} value={data.history} onChange={(e) => handleChanges('history', e.target.value)} placeholder='Enter details here...' name = "description"></textarea>            
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-outline-light btn-sm">Submit</button>
                    </div>
                </form>   
        }
    </div>
    
  )
}
