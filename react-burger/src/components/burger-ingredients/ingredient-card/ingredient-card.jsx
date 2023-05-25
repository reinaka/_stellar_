import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { INGREDIENT } from '../../../constants/constants';

const IngredientCard = memo((props) => {
    const ingredient = props.ingredient;
    const [quantity, setQuantity] = useState(null);
    const constructorIngredients = useSelector(store => store.burgerConstructor.items);
    const selectedBun = useSelector(store => store.burgerConstructor.selectedBun);

    useEffect(() => {
        if(ingredient.type === 'bun' ) {
            if(selectedBun) {
            selectedBun._id === ingredient._id
            ? setQuantity(2)
            : setQuantity(null)
            }
        } else {
            let count = 0;
            if(constructorIngredients) {
                constructorIngredients.forEach(item => {
                    if(item.ingredient._id === ingredient._id) {
                        count++;
                    }
                })
            }
            count > 0 ? setQuantity(count) : setQuantity(null);
        }
        
    }, [constructorIngredients, ingredient._id, ingredient.type, selectedBun])

    //dnd
    const [{ isDragging }, ref] = useDrag({
        type: INGREDIENT,
        item: ingredient,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
            <div ref={ref} draggable={true}>
                {quantity && (
                    <div className={styles.quantity}>
                        <p className="text text_type_digits-default">{quantity}</p>
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
}

export default IngredientCard;