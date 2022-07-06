import { CharacterInterface } from '../Interface/CharacterInterface';
import useModal from './hooks/useModal';
import Modal from './Modal';
import { Edit } from './Edit';
import './Character.css';
import Delete from './Delete';

interface Props {
    character: CharacterInterface;
    setCharacter: (newCharacter: CharacterInterface) => void
    handleDeleteCharacter: (deleteCharacter: CharacterInterface) => Promise<boolean>
}

const Character: React.FC<Props> = ( { character, setCharacter, handleDeleteCharacter } ) => {
    
    const [ isOpenModalUpdate, openModalUdate, closeModalUpdate ] = useModal();
    const [ isOpenModalDelete, openModalDelete, closeModalDelete] = useModal();

    return (
        <>
            <div className='card mb-4'>
                <img 
                    src={character.image} 
                    className="card-img-top centrar" 
                    alt={character.name} 
                />
                <div className="card-body">
                    <h5 className='card-title'>{character.name}</h5>
                    {/* <h6 className='card-body'>{character.history}</h6> */}
                    <div className="row">
                        <button className='btn btn-outline-primary col-6' onClick={openModalUdate}>Editar</button>
                        {
                            isOpenModalUpdate && <Modal 
                                                isOpen={isOpenModalUpdate} 
                                                closeModal={closeModalUpdate}
                                            >
                                                <Edit 
                                                    character={character} 
                                                    setCharacterUpdate = {setCharacter}
                                                    closeModal = {closeModalUpdate}
                                                />
                                            </Modal>
                        } 
                        <button className='btn btn-outline-danger col-6' onClick={openModalDelete}>Eliminar</button>
                        {
                            isOpenModalDelete && <Modal 
                                                isOpen={isOpenModalDelete} 
                                                closeModal={closeModalDelete}
                                            >
                                                <Delete 
                                                    character={character}
                                                    closeModal={closeModalDelete}
                                                    handleDeleteCharacter={handleDeleteCharacter}
                                                />
                                            </Modal>
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Character