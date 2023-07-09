import Tabs from './tabs/tabs';
import IngredientsBlock from "./ingredients-block/ingredients-block";
import styles from './burger-ingredients.module.css';
import { BUN, MAIN, SAUCE } from '../../constants/constants';
import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_INGREDIENT_DETAILS } from '../../services/actions/current-ingredient-actions';
import { TIngredient } from '../../services/types/types';

const BurgerIngredients = memo(() => {
    const dispatch = useDispatch();
    const [currentSection, setCurrentSection] = useState(BUN);


    const openIngredientModal = useCallback((item : TIngredient) => {
        dispatch({
            type: ADD_INGREDIENT_DETAILS,
            payload: item,
        });
    }, [dispatch]);


    return (
        <article>
            <Tabs currentSection={currentSection} setCurrentSection={setCurrentSection}/>
                <div className={styles.scroll}>
                    <IngredientsBlock 
                        title='Булки' 
                        onClickHandler={openIngredientModal} 
                        filter={BUN} 
                        setCurrentSection={setCurrentSection}
                    />
                    <IngredientsBlock 
                        title='Соусы' 
                        onClickHandler={openIngredientModal} 
                        filter={SAUCE} 
                        setCurrentSection={setCurrentSection}
                    />
                    <IngredientsBlock 
                        title='Начинки' 
                        onClickHandler={openIngredientModal} 
                        filter={MAIN} 
                        setCurrentSection={setCurrentSection}
                    />
                </div>
        </article>
        )
    })

    export default BurgerIngredients;
