import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './price.module.css';

export const Price = (props : {price : number, styles? : string, size?: string}) => {
    return (
        <span className={`${props.size === "big" ? styles.priceInfoBig : styles.priceInfo} ${props.styles} ${styles.priceInfoGeneral}`}>
            <p className={props.size === "big" ? "text text_type_digits-medium" : "text text_type_digits-default"}>{props.price}</p>
            <CurrencyIcon type="primary"/>
        </span>
    )
}