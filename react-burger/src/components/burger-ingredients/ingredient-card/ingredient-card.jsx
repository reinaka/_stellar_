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
                <img src={props.ingredient.image} className='pr-4 pl-4' alt={props.ingredient.name}/>
                <span className={`${styles.priceBlock} mt-1 mb-1 pr-4 pl-4 pt-1`}>
                    <p className="text text_type_digits-default">{props.ingredient.price}</p>
                    <CurrencyIcon />
                </span>
                    <p className={`text text_type_main-default ${styles.nameText}`}>{props.ingredient.name}</p>
            </>
        )
}

IngredientCard.propTypes = {
    ingredient: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    quantity: PropTypes.oneOfType([PropTypes.string,PropTypes.number,PropTypes.bool]),
}