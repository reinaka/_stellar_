import styles from '../../modal/modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { PropTypes } from 'prop-types';

export function ModalWrapper(props) {
    return (
        <div className={`${styles.wrapper} p-10`}>
            <span className={`${styles.top} mb-4`}>
                <p className={`${styles.title} mr-9 text text_type_main-large`}>{props.title}</p>
                    <CloseIcon type="primary" onClick={props.onClose}/>
            </span>
            {props.children}
        </div>
    )
}

ModalWrapper.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
}