import { useState } from "react"

const useModal = (initialValue: boolean = false) : [ boolean, () => void, () => void ]=> {
    const [ isOpenModal, setIsOpenModal ] = useState<boolean>(initialValue);

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    return [ isOpenModal, openModal, closeModal ];
}

export default useModal