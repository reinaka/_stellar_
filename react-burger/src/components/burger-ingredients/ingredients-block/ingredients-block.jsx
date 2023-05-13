import styles from './ingredients-block.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import { memo } from 'react';
import { useContext } from 'react';
import { AllIngredientsContext } from '../../../services/all-ingredients-context';
import PropTypes from 'prop-types';

const IngredientsBlock = memo((props) => {
    const ingredientsData = useContext(AllIngredientsContext);
    const ingredients = ingredientsData.filter(item => item.type === props.filter);
        return (
            <section>
                <h2 className="text text_type_main-medium">{props.title}</h2>
                <section className="pl-4 pr-4 pt-6 pb-10">
                    <ul className={styles.ulStyle}>
                        {ingredients.map(item => {
                                return (
                                    <li className={styles.liStyle} key={item._id} 
                                    onClick={() => props.onClickHandler(item)}>
                                        <IngredientCard ingredient={item} 
                                            // quantity={}
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