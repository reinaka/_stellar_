import { OrdersInProcess } from "../orders-in-process/orders-in-process";
import { ReadyOrders } from "../ready-orders/ready-orders";
import styles from './general-orders-info.module.css';
import { selectOrders, selectOrdersToday, selectOrdersTotal } from "../../../services/functions/selectorFunctions";
import { useSelector } from 'react-redux';
import { TOrder } from "../../../services/types/types";

export const GeneralOrdersInfo = () => {
    const total = useSelector(selectOrdersTotal);
    const totalToday = useSelector(selectOrdersToday);
    const readyOrderNums = useSelector(selectOrders).filter((order : TOrder) => order.status === "done").map((item : TOrder) => item.number);
    const PendingOrderNums = useSelector(selectOrders).filter((order : TOrder) => order.status === "pending").map((item : TOrder) => item.number);

    return (
        <div className={`${styles.general} ${styles.scroll}`}>
            <div className={styles.layout}>
                <OrdersInProcess title="Готовы:" active={true} num={readyOrderNums} />
                <OrdersInProcess title="В работе:" num={PendingOrderNums} />
            </div>
            <ReadyOrders title="Выполнено за все время:" ordersNumber={total}/>
            <ReadyOrders title="Выполнено за сегодня:" ordersNumber={totalToday}/>
        </div>
    )
}