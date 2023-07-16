import { FC, useEffect } from "react";
import styles from '../general-styles.module.css';
import { OrdersDetaled } from "../../components/orders-feed/orders-detailed/orders-detailed";
import { GeneralOrdersInfo } from "../../components/orders-feed/general-orders-info/general-orders-info";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/socket-actions";
import { useDispatch } from "react-redux";

export const FeedPage:FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START});
        return (() => {
            dispatch({type: WS_CONNECTION_CLOSED});
        })
    },[dispatch]);
    
    return (
        <>
        <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
            <div className={styles.contentBlock}>
                <OrdersDetaled />
                <GeneralOrdersInfo />
            </div>
        </>
    )
}