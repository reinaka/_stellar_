import styles from './order-details.module.css';
import { OrderDetailedInfo } from '../../components/modal/order-detailed-info/order-detailed-info';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/socket-actions';

export const OrderDetailsPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START});
        return (() => {
            dispatch({type: WS_CONNECTION_CLOSED});
        })
    },[dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
                <OrderDetailedInfo />
            </div>
        </div>
    )
}