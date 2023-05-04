import image from '../../../images/done.png';
import styles from './order-details.module.css';

export default function OrderDetails() {
    return (
        <div className={styles.wrapper}>
            <p className="text text_type_digits-large">034536</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img src={image} alt="order is placed"/>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default mb-20">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}