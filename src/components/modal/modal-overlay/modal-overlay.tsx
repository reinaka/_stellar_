import styles from './modal-overlay.module.css';
import { FC, ReactNode, EventHandler } from 'react';

type TProps = {
    onClick : EventHandler<React.SyntheticEvent<HTMLDivElement, Event>>,
    children? : ReactNode,
}

const ModalOverlay:FC<TProps> = (props) => {
    return (
        <div className={styles.overlay} onClick={props.onClick}>{props.children}</div>
    )
}

export default ModalOverlay;