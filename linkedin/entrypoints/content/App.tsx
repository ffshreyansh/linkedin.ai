import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import '../../assets/main.css'

export default function CustomDialog() {
    const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log('DOM is fully loaded');
        const checkAndInsertComponent = () => {
            const editableDiv = document.querySelector('.msg-form__contenteditable');

            if (editableDiv) {
                const parentElement = editableDiv.parentElement;

                if (!modalContainer) {
                    const newModalContainer = document.createElement('div');
                    newModalContainer.className = 'modal-container';
                    parentElement?.appendChild(newModalContainer);
                    setModalContainer(newModalContainer);
                }
            } else {
                console.log('editableDiv not found, retrying...');
                setTimeout(checkAndInsertComponent, 100);
            }
        };
        checkAndInsertComponent();
    }, [modalContainer]);
    return (
        modalContainer ? ReactDOM.createPortal(<Modal />, modalContainer) : null
    );
}
