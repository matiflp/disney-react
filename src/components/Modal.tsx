import React, { PropsWithChildren } from 'react';
import './Modal.css'

interface Props{
    isOpen: boolean,
    closeModal: () => void
}

const Modal: React.FC<PropsWithChildren<Props>> = ({ isOpen, closeModal, children }) => {
    
    const handleModalDialogClick = (e: React.FormEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }
    
    return (
        <div className={`modal-style ${isOpen && 'modal-style-open'}`} onClick={closeModal}>
            <div className='modal-style__dialog' onClick={(e) => handleModalDialogClick(e)}>
                <input type='button' value='X' className='btn btn-outline-light btn-sm input-style-modal' onClick={closeModal} />
                {children}
            </div>
        </div>
    )
}

export default Modal