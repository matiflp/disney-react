import { useCallback, useEffect, useState } from 'react'
import Character from './Character';
import initialMovies from '../const/initialCharacters'
import { DeleteData, GetData } from '../helpers/DataHelper';
import { CharacterInterface } from '../Interface/CharacterInterface';
import Spinner from './Spinner';

const CharactersList = () => {
    const [ characters, setCharacters ] = useState<CharacterInterface[]>(initialMovies);
    const [ characterUpdate, setCharacterUpdate ] = useState<CharacterInterface>(initialMovies[0]); 
    const [ isCharacterLoading, setIsCharacterLoading] = useState(false);

    const updateData = useCallback( async () => {
        setIsCharacterLoading(true);
        const response = await GetData('characters');
        setIsCharacterLoading(false);

        if(response?.characters){
            setCharacters(response.characters);
        }
        else if(response?.response){
            alert(response.response.message);  
        };
        
    },[]);

    useEffect(() => {   
        updateData();
    }, [characterUpdate, updateData]);

    const handleNewCharacter = (newCharacter: CharacterInterface) => {
        setCharacterUpdate(newCharacter);

        const changedCharacters = characters.map((character) => character.id === characterUpdate.id ? characterUpdate : character)
    
        setCharacters(changedCharacters);
    }

    const handleDeleteCharacter = async (deleteCharacter: CharacterInterface) : Promise<boolean> => {

        setCharacterUpdate(deleteCharacter);
        
        const data = await DeleteData(`characters/${deleteCharacter.id}`);

        if(data.isOk){
            const changedCharacters = characters.filter((character) => character.id !== deleteCharacter.id);
            alert(data.message);
            setCharacters(changedCharacters);
            return true;
        }
        else{
            alert(data.message);
            return false;
        }
    }

    return (
        <div className="container">
            {isCharacterLoading
            ?
                <div className='spinner'>
                    <Spinner />
                </div>  
            :
                <div className="row">
                    {characters.map(character => (                  
                        <div className="col-md-4" key={character.id}>
                            <Character 
                                character = { character }
                                setCharacter = {handleNewCharacter}
                                handleDeleteCharacter={handleDeleteCharacter}
                            />
                        </div>
                    ))}
                </div>
            }
        </div>
        
    )
}

export default CharactersList