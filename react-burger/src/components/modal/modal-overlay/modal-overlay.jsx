import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay(props) {
    return (
    <div className={styles.overlay} onClick={props.onclick}>{props.children}</div>
    )
}

ModalOverlay.propTypes = {
    onclick: PropTypes.func.isRequired,
}