import { FC, useMemo } from "react";
import styles from './orders-in-process.module.css';

type TProps = {
    title : string,
    active? : boolean,
    orders : {
        num : number,
        id : string
    }[]
};

export const OrdersInProcess:FC<TProps> = (props) => {
    const columns = useMemo(() => {
        return props.orders.length < 11
        ? (
            <div>
                {props.orders.map(item => (
                <li className={props.active ? styles.textColorActive : undefined} key={item.id}>
                    <p className="text text_type_digits-default">{item.num}</p>
                </li>
                ))}
            </div>
        )
        : (
            <>
                <div>
                {props.orders.map((item, index) => (
                    index < 10 && (
                        <li className={props.active ? styles.textColorActive : undefined} key={item.id}>
                    <p className="text text_type_digits-default">{item.num}</p>
                </li>
                    )
                ))}
                </div>
                <div>
                    {props.orders.map((item, index) => (
                        index > 9 && index < 20 && (
                            <li className={props.active ? styles.textColorActive : undefined} key={item.id}>
                                <p className="text text_type_digits-default">{item.num}</p>
                            </li>
                        )
                    ))}
                </div>
            </>
        )
    }, [props.active, props.orders]);

    return (
        <div>
            <h2 className="text text_type_main-medium mb-6">{props.title}</h2>
            <ul className={styles.columns}>{columns}</ul>
        </div>
    )
}