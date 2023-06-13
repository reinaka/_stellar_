import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay(props) {
    return (
    <div className={styles.overlay} onClick={props.onClick}>{props.children}</div>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func,
}