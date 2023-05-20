import image from '../../../images/done.png';
import styles from './order-details.module.css';
import PropTypes from 'prop-types';

export default function OrderDetails(props) {
    return (
        <div className={styles.wrapper}>
            <p className={`${styles.orderNum} text text_type_digits-large`}>{props.orderNum}</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img src={image} alt="order is placed"/>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default mb-20">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

