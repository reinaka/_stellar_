import styles from './order-block.module.css';
import { Price } from '../../ui-elements/price/price';
import { FC, memo } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../../services/hooks/reduxTypes';
import { selectAllIngredientsItems } from '../../../services/functions/selectorFunctions';
import { TOrder } from '../../../services/types/types';
import { IngredientCircle } from '../../ui-elements/ingredient-circle/ingredient-circle';
import { OrderStatus } from '../../ui-elements/order-status/order-status';

type TProps = {
    item : TOrder,
    showStatus? : boolean
}

export const OrderBlock:FC<TProps> = memo((props) => {
    const storeIngredients = useAppSelector(selectAllIngredientsItems);
    const date = props.item.updatedAt || "";
    let sum = 0;
    props.item.ingredients.forEach(item => storeIngredients.forEach(ingredient => {
        if(ingredient._id === item) sum += ingredient.price;
    }));


    return (
            <div className={`${styles.wrapper} p-6 mr-2`}>
                <div className={styles.upperText}>
                    <p className={`text text_type_digits-default mb-6`}>#{props.item.number}</p>
                    <FormattedDate className="text text_type_main-small text_color_inactive" date={new Date(date)} />
                </div>
                <p className={`text text_type_main-large ${styles.orderTitleText} mb-6`}>{props.item.name}</p>
                {props.showStatus && <OrderStatus status={props.item.status}/>}
                <div className={styles.iconsAndPrice}>
                    <ul className={`${styles.ingredientIcons} ${styles.list}`}>
                        {props.item.ingredients.map((ingredient, index) => {
                            if(index < 5) {
                                return (
                                <li key={index} style={{zIndex: String(props.item.ingredients.length - index)}} className={index > 0? styles.movedItems : undefined}>
                                    <IngredientCircle itemID={ingredient}/>
                                </li>
                            )} else if(index === 5) {
                                return (
                                <li key={index}>
                                    <IngredientCircle itemID={ingredient} last={true} unshownIngredients={props.item.ingredients.length - index}/>
                                </li>
                                )
                            } else {
                                return undefined;
                            }
                        }
                        )}
                    </ul>
                    <Price price={sum}/>
                </div>
            </div>
    )
});