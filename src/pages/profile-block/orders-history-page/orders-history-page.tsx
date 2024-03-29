import { OrderBlock } from "../../../components/orders-feed/order-block/order-block";
import styles from './orders-history-page.module.css';
import { selectOrders } from "../../../services/functions/selectorFunctions";
import { TOrder } from "../../../services/types/types";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../services/hooks/reduxTypes";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../../services/actions/socket-actions';
import { ADD_CURRENT_ORDER_DETAILS } from "../../../services/actions/current-order-actions";
import { Spinner } from "../../../components/ui-elements/spinner/spinner";
import { WS_BASE_URL } from "../../../constants/constants";

export const OrdersHistoryPage = () => {
    const dispatch = useAppDispatch();
    let accessToken = localStorage.getItem('accessToken');
    if(accessToken) {accessToken = accessToken.replace('Bearer ', '')};
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, baseUrl: WS_BASE_URL, payload: `?token=${accessToken}`});
        return (() => {
            dispatch({type: WS_CONNECTION_CLOSED});
        })
    },[dispatch, accessToken]);

    const openCurrentOrderModal = useCallback((item : TOrder) => {
        dispatch({
            type: ADD_CURRENT_ORDER_DETAILS,
            payload: item,
        });
    }, [dispatch]);

    const orders = useAppSelector(selectOrders);
    const location = useLocation();
    
    if(orders && Object.keys(orders).length === 0) return <Spinner/>
    return( orders && 
        <div className={`${styles.layout} ${styles.scroll}`}>
            <ul className={styles.list}>
                {orders.map(order => (
                    <li key={order._id} onClick={() => openCurrentOrderModal(order)}>
                        <Link 
                            key={order._id} 
                            to={{ pathname: `/profile/orders/${order._id}` }}
                            state={{ background: location }}
                        >
                            <OrderBlock item={order} showStatus={true}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}