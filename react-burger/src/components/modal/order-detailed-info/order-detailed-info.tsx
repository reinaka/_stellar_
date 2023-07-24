import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../services/hooks/reduxTypes";
import { selectCurrentOrder, selectOrders } from "../../../services/functions/selectorFunctions";
import { OrderStatus } from "../../ui-elements/order-status/order-status";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Price } from "../../ui-elements/price/price";
import { TIngredient } from "../../../services/types/types";
import { selectAllIngredientsItems } from "../../../services/functions/selectorFunctions";
import { OrderIngredientsBlock } from "../../ui-elements/order-ingredients-block/order-ingredients-block.module.css/order-ingredients-block";
import styles from './order-detailed-info.module.css';
import { Spinner } from "../../ui-elements/spinner/spinner";

export const OrderDetailedInfo = () => {
    const params = useParams();
    const selectedOrder = useAppSelector(selectCurrentOrder);
    const allOrders = useAppSelector(selectOrders);
    const storeIngredients : TIngredient[] = useAppSelector(selectAllIngredientsItems);
    if(allOrders) allOrders.filter(item => item._id === params.orderId);
    const orderData = selectedOrder 
                        ? selectedOrder 
                        : allOrders[0]

    const date = orderData
    ? orderData.updatedAt
    : '';

    //расчет общей стоимости заказа
    let sum = 0;
    if(orderData && orderData.ingredients) orderData.ingredients.forEach((item : string) => storeIngredients.forEach(ingredient => {
        if(ingredient._id === item) sum += ingredient.price;
    }));

    //группировка ингредиентов с подсчетом количества одинаковых элементов
    type TGroupedIngredients = {
        [key: string]: number
    }
    const groupedIngredients = orderData?.ingredients.reduce((acc : TGroupedIngredients, item : string) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {}) || [];
    const groupedIngredientsKeys : string[] | [] = Object.keys(groupedIngredients) || [];

    if(!orderData) return <Spinner />;
    return (
        <div>
            <p className={`text text_type_digits-default ${styles.num} mb-10`}>#{orderData.number}</p>
            <h2 className="text text_type_main-medium mb-3">{orderData.name}</h2>
            <OrderStatus status={`${orderData.status}`}/>
            <p className="text text_type_main-medium mb-6 mt-15">Состав:</p>
            <ul className={`${styles.list} mb-16`}>
                {groupedIngredients && groupedIngredientsKeys.map(ingredient => (
                    <li key={ingredient}>
                        <OrderIngredientsBlock itemID={ingredient} quantity={groupedIngredients[ingredient]}/>
                    </li>
                ))
                }
            </ul>
            <div className={`${styles.dateAndTotalPrice}`}>
                <FormattedDate className="text text_type_main-small text_color_inactive" date={new Date(date)} />
                <Price price={sum}/>
            </div>
        </div>
    )
};