import ReactDOM from 'react-dom';
import { useEffect, FC } from 'react';
import ModalOverlay from "./modal-overlay/modal-overlay";
import ModalWrapper from '../ui-elements/modal-wrapper/modal-wrapper';
import { TModal } from '../../services/types/types';

const modalRoot = document.getElementById("modalRoot");

const Modal:FC<TModal> = (props) => {
    useEffect(() => {
        function closeByEsc(e : KeyboardEvent) {if(e.key === 'Escape') props.onClose()}
        document.addEventListener('keydown', closeByEsc);
        return () => {document.removeEventListener('keydown', closeByEsc)}
    }, [props]);

    const element = (
        <>
        <ModalOverlay onClick={props.onClose} />
            <ModalWrapper title={props.title} onClose={props.onClose} children={props.children}/>
        </>
        );

    return ReactDOM.createPortal (
        element,
        modalRoot!
    )
}

export default Modal;