import { OrderBlock } from "../order-block/order-block";
import styles from './orders-detailed.module.css';
import { selectOrders } from "../../../services/functions/selectorFunctions";
import { useAppSelector, useAppDispatch } from "../../../services/hooks/reduxTypes";
import { TOrder } from "../../../services/types/types";
import { useCallback } from "react";
import { ADD_CURRENT_ORDER_DETAILS } from "../../../services/actions/current-order-actions";
import { Link, useLocation } from "react-router-dom";

export const OrdersDetailed = () => {
    const orders = useAppSelector(selectOrders);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const openCurrentOrderModal = useCallback((item : TOrder) => {
        dispatch({
            type: ADD_CURRENT_ORDER_DETAILS,
            payload: item,
        });
    }, [dispatch]);

    return (
        <article className={styles.scroll}>
            <ul className={styles.list}>
                {orders.map(item => (
                    <li key={item._id} onClick={() => openCurrentOrderModal(item)}>
                        <Link 
                            key={item._id} 
                            to={{ pathname: `/feed/${item._id}` }}
                            state={{ background: location }}
                        >
                            <OrderBlock item={item}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </article>
    )
}