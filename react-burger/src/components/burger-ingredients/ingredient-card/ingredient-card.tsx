import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';
import { memo, useState, useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { INGREDIENT } from '../../../constants/constants';
import { selectBurgerConstructorItems, selectSelectedBun } from '../../../services/functions/selectorFunctions';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../../services/types/ingredinet-type';

const IngredientCard:FC<TIngredient> = memo((props) => {
    const ingredient = props.ingredient;
    const [quantity, setQuantity] = useState<number | null>(null);
    const constructorIngredients = useSelector(selectBurgerConstructorItems);
    const selectedBun = useSelector(selectSelectedBun);
    const location = useLocation();

    useEffect(() => {
        if(ingredient.type === 'bun' ) {
            if(selectedBun) {
            selectedBun._id === ingredient._id
            ? setQuantity(2)
            : setQuantity(null)
            } else {
                setQuantity(null)
            }
        } else {
            let count = 0;
            if(constructorIngredients) {
                constructorIngredients.forEach((item : TIngredient["ingredient"]) => {
                    if(item && (item._id === ingredient._id)) {
                        count++;
                    }
                })
            }
            count > 0 ? setQuantity(count) : setQuantity(null);
        }
        
    }, [constructorIngredients, ingredient._id, ingredient.type, selectedBun])

    //dnd
    const [{isDragging}, ref] = useDrag({
        type: INGREDIENT,
        item: ingredient,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
            <Link
                key={ingredient._id} 
                to={{ pathname: `/ingredients/${ingredient._id}` }}
                state={{ background: location }}
            >
                <div ref={ref} draggable={true}>
                    {quantity && (
                        <div className={styles.quantity}>
                            <p className="text text_type_digits-default">{quantity}</p>
                        </div>
                    )}
                    <img src={ingredient.image} className='pr-4 pl-4' alt={ingredient.name}/>
                    <span className={`${styles.priceBlock} mt-1 mb-1 pr-4 pl-4 pt-1`}>
                        <p className="text text_type_digits-default">{ingredient.price}</p>
                        <CurrencyIcon type="primary"/>
                    </span>
                        <p className={`text text_type_main-default ${styles.nameText}`}>{ingredient.name}</p>
                </div>
            </Link>
        )
});

export default IngredientCard;