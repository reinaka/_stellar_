import { FC } from "react";
import styles from './ready-orders.module.css';

type TProps = {
    title : string,
    ordersNumber : number
}

export const ReadyOrders:FC<TProps> = (props) => {
    return (
        <div>
            <h2 className="text text_type_main-medium">{props.title}</h2>
            <div className={`${styles.numbers} text text_type_digits-large`}>{props.ordersNumber}</div>
        </div>
    )
}