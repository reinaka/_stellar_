import styles from './order-details.module.css';
import { OrderDetailedInfo } from '../../components/modal/order-detailed-info/order-detailed-info';
import { useAppDispatch } from '../../services/hooks/reduxTypes';
import { useEffect, FC } from 'react';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/actions/socket-actions';

type TProps = {
    anonymous? : boolean
}

export const OrderDetailsPage:FC<TProps> = (props) => {
    let accessToken = localStorage.getItem('accessToken');
    if(accessToken) {accessToken = accessToken.replace('Bearer ', '')};
    const endpoint = props.anonymous
    ? `?token=${accessToken}`
    : `/all`;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, payload: endpoint});
        return (() => {
            dispatch({type: WS_CONNECTION_CLOSED});
        })
    },[dispatch, endpoint]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
                <OrderDetailedInfo />
            </div>
        </div>
    )
}