import { FC, useEffect } from "react";
import styles from '../general-styles.module.css';
import { OrdersDetailed } from "../../components/orders-feed/orders-detailed/orders-detailed";
import { GeneralOrdersInfo } from "../../components/orders-feed/general-orders-info/general-orders-info";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/socket-actions";
import { useAppDispatch, useAppSelector } from '../../services/hooks/reduxTypes';
import { selectWSConnectionSuccess } from "../../services/functions/selectorFunctions";
import { Spinner } from "../../components/ui-elements/spinner/spinner";

export const FeedPage:FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, payload: `/all`});
        return (() => {
            dispatch({type: WS_CONNECTION_CLOSED});
        })
    },[dispatch]);

    const socketConnected = useAppSelector(selectWSConnectionSuccess);
    
    if(!socketConnected) return <Spinner />;
    return (
        <>
        <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
            <div className={styles.contentBlock}>
                <OrdersDetailed />
                <GeneralOrdersInfo />
            </div>
        </>
    )
}