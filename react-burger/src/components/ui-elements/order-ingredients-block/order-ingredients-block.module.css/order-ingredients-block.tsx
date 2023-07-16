import { IngredientCircle } from "../../ingredient-circle/ingredient-circle";
import { FC, useMemo } from "react";
import { Price } from "../../price/price";
import { TIngredient } from "../../../../services/types/types";
import { useSelector } from "react-redux";
import { selectAllIngredientsItems } from "../../../../services/functions/selectorFunctions";
import styles from './order-ingredients-block.module.css';

type TProps = {
    itemID : string,
    quantity : number
}

export const OrderIngredientsBlock:FC<TProps> = (props) => {
    const storeIngredients : TIngredient[] = useSelector(selectAllIngredientsItems);
    const price = useMemo(() => {
        return storeIngredients.filter(item => item._id === props.itemID)[0].price;
    }, [props.itemID, storeIngredients]);
    const title = useMemo(() => {
        return storeIngredients.filter(item => item._id === props.itemID)[0].name;
    }, [props.itemID, storeIngredients]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.iconAndTitle}>
                <IngredientCircle itemID={props.itemID}/>
                <p className={`text text_type_main-default ml-4 ${styles.title}`}>{title}</p>
            </div>
            <div className={styles.priceAndQuantity}>
                <p className="text text_type_digits-default mr-2">{props.quantity}</p>
                <p className="text text_type_digits-default mr-2">x</p>
                <Price price={price}/>
            </div>
        </div>
    )
}