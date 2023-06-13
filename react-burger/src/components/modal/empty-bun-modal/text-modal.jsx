import ReactDOM from 'react-dom';
import { useEffect, useMemo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import styles from '../error-modal/error-modal.module.css';
import generalStyles from '../modal.module.css';

const modalRoot = document.getElementById("modalRoot");

export default function TextModal(props) {
    useEffect(() => {
        function closeByEsc(e) {if(e.key === 'Escape') props.closeModal()}
        document.addEventListener('keydown', closeByEsc);
        return () => {document.removeEventListener('keydown', closeByEsc)}
    }, [props.closeModal, props]);

    const element = useMemo(() => (
        <>
        <ModalOverlay onClick={props.closeModal} />
        <div className={`${generalStyles.wrapper} ${styles.boxShaddow} p-10`}>
                <div className={styles.errorWrapper}>
                    <p className={`${styles.title} mr-9 mb-10 text text_type_main-default`}>{props.children}</p>
                    <Button htmlType="button" onClick={props.closeModal}>{props.buttonText}</Button>
                </div>
        </div>
        </>
    ), [props.closeModal, props.children, props.buttonText]);

    return ReactDOM.createPortal (
            element,
        modalRoot
    )
}

TextModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
}