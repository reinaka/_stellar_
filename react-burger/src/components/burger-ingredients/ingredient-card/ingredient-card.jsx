import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { memo } from 'react';
import { INGREDIENT } from '../../../constants/constants';

const IngredientCard = memo((props) => {
    const ingredient = props.ingredient;
    const [{ isDragging }, ref] = useDrag({
        type: INGREDIENT,
        item: ingredient,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
            <div ref={ref} draggable={true}>
                {props.quantity && (
                    <div className={styles.quantity}>
                        <p className="text text_type_digits-default">{props.quantity}</p>
                    </div>
                )}
                <img src={ingredient.image} className='pr-4 pl-4' alt={ingredient.name}/>
                <span className={`${styles.priceBlock} mt-1 mb-1 pr-4 pl-4 pt-1`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon />
                </span>
                    <p className={`text text_type_main-default ${styles.nameText}`}>{ingredient.name}</p>
            </div>
        )
});

IngredientCard.propTypes = {
    ingredient: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    quantity: PropTypes.oneOfType([PropTypes.string,PropTypes.number,PropTypes.bool]),
}

export default IngredientCard;