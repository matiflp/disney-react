import React, { useState } from 'react'
import { CharacterInterface } from '../Interface/CharacterInterface';
import './Delete.css';
import Spinner from './Spinner';

interface Props {
    character: CharacterInterface;
    closeModal: () => void;
    handleDeleteCharacter: (deleteCharacter: CharacterInterface) => Promise<boolean>
}

const Delete : React.FC<Props> = ({ character, closeModal, handleDeleteCharacter }) => {

    const [ isLoading, setIsLoading ] = useState(false);

    const handleDelete = async () => {

        setIsLoading(true);
        const isSucess = await handleDeleteCharacter(character)
        setIsLoading(false);

        if(isSucess)
            closeModal();
    }

    return (
        <div className='delete-character text-white-50'>
            <h3>Eliminar</h3>
            {isLoading
            ?
                <div className='spinner'>
                    <Spinner />
                </div>  
            :
                <div>
                    <hr />
                    <h6>¿Estas seguro que desea eliminar este Personaje?</h6> 
                    <div className='mt-4'>
                        <button className="btn btn-outline-light btn-sm col-6" onClick={handleDelete}>Eliminar</button>
                        <button className="btn btn-outline-light btn-sm col-6" onClick={closeModal}>Salir</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Delete