import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
import styles from './modal.module.css';

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
        <div className={`${styles.wrapper} p-10`}>
            <span className={`${styles.top} mb-4`}>
                <p className={`${styles.title} mr-9 text text_type_main-large`}>{props.title}</p>
                    <CloseIcon type="primary" onClick={props.onClose}/>
            </span>
            {props.children}
        </div>
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