import React from "react";
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from './modal.module.css';

const modalRoot = document.getElementById("modalRoot");

export default function Modal(props) {
    const element = (
        <ModalOverlay onclick={props.onclick}>
            <div className={`${styles.wrapper} p-10`}>
                <span className={`${styles.top} mb-4`}>
                    <p className={`${styles.title} mr-9 text text_type_main-large`}>{props.title}</p>
                    <CloseIcon type="primary" onClick={props.onclick}/>
                </span>
                {props.children}
            </div>
        </ModalOverlay>);

    return ReactDOM.createPortal (
            element,
        modalRoot
    )
}