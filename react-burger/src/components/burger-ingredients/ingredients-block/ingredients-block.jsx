import styles from './ingredients-block.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const IngredientsBlock = memo((props) => {
    const ingredientsData = useSelector(store => store.burgerIngredients.items);
    const ingredients = ingredientsData.filter(item => item.ingredient.type === props.filter);

    
        return (
            <section>
                <h2 className="text text_type_main-medium">{props.title}</h2>
                <section className="pl-4 pr-4 pt-6 pb-10">
                    <ul className={styles.ulStyle}>
                        {ingredients.map(item => {
                                return (
                                    <li className={styles.liStyle} key={item.ingredient._id} 
                                    onClick={() => props.onClickHandler(item)}>
                                        <IngredientCard ingredient={item.ingredient} 
                                                        quantity={item.quantity}
                                        />
                                    </li>)
                                }
                        )}
                    </ul>
                </section>
        </section>
    )
});

IngredientsBlock.propTypes = {
    title: PropTypes.string,
    openIngredientDetails: PropTypes.func,
}

export default IngredientsBlock;