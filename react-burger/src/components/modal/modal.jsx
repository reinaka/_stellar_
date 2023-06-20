import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
import { ModalWrapper } from '../ui-elements/modal-wrapper/modal-wrapper';

const modalRoot = document.getElementById("modalRoot");

export default function Modal(props) {
    useEffect(() => {
        function closeByEsc(e) {if(e.key === 'Escape') props.onClose()}
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
        modalRoot
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
}