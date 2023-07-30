import { OrdersInProcess } from "../orders-in-process/orders-in-process";
import { ReadyOrders } from "../ready-orders/ready-orders";
import styles from './general-orders-info.module.css';
import { selectOrders, selectOrdersToday, selectOrdersTotal } from "../../../services/functions/selectorFunctions";
import { useAppSelector } from "../../../services/hooks/reduxTypes";

export const GeneralOrdersInfo = () => {
    const total = useAppSelector(selectOrdersTotal);
    const totalToday = useAppSelector(selectOrdersToday);
    const readyOrderNums = useAppSelector(selectOrders).filter(order => order.status === "done").map((item) => ({num: item.number, id: item._id}));
    const PendingOrderNums = useAppSelector(selectOrders).filter(order => order.status === "pending").map((item) => ({num: item.number, id: item._id}));

    return (
        <div className={`${styles.general} ${styles.scroll}`}>
            <div className={styles.layout}>
                <OrdersInProcess title="Готовы:" active={true} orders={readyOrderNums} />
                <OrdersInProcess title="В работе:" orders={PendingOrderNums} />
            </div>
            <ReadyOrders title="Выполнено за все время:" ordersNumber={total}/>
            <ReadyOrders title="Выполнено за сегодня:" ordersNumber={totalToday}/>
        </div>
    )
}