import { useAppSelector } from "../../../services/hooks/reduxTypes";
import { selectAllIngredientsItems } from "../../../services/functions/selectorFunctions";
import { TIngredient } from "../../../services/types/types";
import { FC } from "react";
import styles from './ingredient-circle.module.css';


type TProps = {
    itemID : string,
    last? : boolean,
    unshownIngredients? : number
}

export const IngredientCircle:FC<TProps> = (props) => {
    const storeIngredients : TIngredient[] = useAppSelector(selectAllIngredientsItems);
    const ingredient = storeIngredients.filter(item => item._id === props.itemID)[0];
    return (ingredient && 
        <div className={styles.outerCircle}>
            <div className={styles.innerCircle}>
                <img alt={ingredient.name} src={ingredient.image} className={`${styles.image} ${props.last ? styles.inactiveImage : undefined}`}/>
                {props.last && (
                    <p className={`text text_type_digits-default ${styles.inactiveIcon}`}>+{props.unshownIngredients}</p>
                )}
            </div>
        </div>
    )
}