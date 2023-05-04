import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';

export default function IngredientCard(props) {
    return (
            <>
                {props.quantity && (
                    <div className={styles.quantity}>
                        <p className="text text_type_digits-default">1</p>
                    </div>
                )}
                <img src={props.image} alt={props.name} className='pr-4 pl-4'/>
                <span className={`${styles.priceBlock} mt-1 mb-1 pr-4 pl-4 pt-1`}>
                    <p className="text text_type_digits-default">{props.price}</p>
                    <CurrencyIcon />
                </span>
                    <p className={`text text_type_main-default ${styles.nameText}`}>{props.name}</p>
                </>
        )
}

IngredientCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
    quantity: PropTypes.oneOfType([PropTypes.string,PropTypes.number,PropTypes.bool]).isRequired,
}