import styles from './order-status.module.css';
import { FC } from 'react';

type TProps = {
    status : string
}

export const OrderStatus:FC<TProps> = ( props ) => {
    const statusText = props.status === "done"
    ? "Выполнен"
    : props.status === "pending"
    ? "Готовится"
    : "Создан";

    const statusStyle = props.status === "done"
    ? `text text_type_main-small ${styles.done} mb-3`
    : "text text_type_main-small mb-3";


    return (
        <p className={statusStyle}>{statusText}</p>
    )
}