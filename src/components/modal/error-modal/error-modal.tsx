import ReactDOM from 'react-dom';
import { useEffect, useMemo, FC } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './error-modal.module.css';
import generalStyles from '../modal.module.css';

const modalRoot = document.getElementById("modalRoot");

type TProps = {
    closeModal: () => void,
    message: string | undefined,
}

const ErrorModal:FC<TProps> = (props) => {
    useEffect(() => {
        function closeByEsc(e : KeyboardEvent) {if(e.key === 'Escape') props.closeModal()}
        document.addEventListener('keydown', closeByEsc);
        return () => {document.removeEventListener('keydown', closeByEsc)}
    }, [props.closeModal, props]);

    const element = useMemo(() => (
        <>
        <ModalOverlay onClick={props.closeModal} />
        <div className={`${generalStyles.wrapper} ${styles.boxShaddow} p-10`}>
                <div className={styles.errorWrapper}>
                    <p className={`${styles.title} mr-9 mb-10 text text_type_main-default`}>{props.message}</p>
                    <Button htmlType="button" onClick={props.closeModal}>Понятно</Button>
                </div>
        </div>
        </>
    ), [props.closeModal, props.message]);

    return ReactDOM.createPortal (
            element,
        modalRoot!
    )
}

export default ErrorModal;
