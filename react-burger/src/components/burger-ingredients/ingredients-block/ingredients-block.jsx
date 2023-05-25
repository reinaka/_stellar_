import styles from './ingredients-block.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const IngredientsBlock = memo((props) => {
    const ingredientsData = useSelector(store => store.burgerIngredients.items);
    const ingredients = ingredientsData.filter(item => item.ingredient.type === props.filter);
    const setCurrentSection = props.setCurrentSection;

    const ref = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) setCurrentSection(props.filter);
            })
        },
        {
            rootMargin: '-45% 0px -45% 0px',
        });
        observer.observe(ref.current);
    }, []);


    
        return (
            <section className='observedSection' id={`${props.filter}_id`}>
                <h2 className="text text_type_main-medium">{props.title}</h2>
                <section ref={ref} className="pl-4 pr-4 pt-6 pb-10">
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