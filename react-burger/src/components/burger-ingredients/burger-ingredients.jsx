import Tabs from './tabs/tabs';
import IngredientsBlock from "./ingredients-block/ingredients-block";
import styles from './burger-ingredients.module.css';
import { BUN, MAIN, SAUCE } from '../../constants/constants';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useModal } from '../../hooks/use-modal';
import { useMemo, memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../../services/actions/current-ingredient-actions';
import { selectIngredientDetails } from '../../services/selectorFunctions';


const BurgerIngredients = memo(() => {
    const [isModalVisible, openModal, closeModal] = useModal();
    const dispatch = useDispatch();
    const [currentSection, setCurrentSection] = useState(BUN);

    const openIngredientModal = useCallback(item => {
        dispatch({
            type: ADD_INGREDIENT_DETAILS,
            payload: item,
        });
        openModal();
    }, [openModal, dispatch]);

    const closeIngredientModal = useCallback(() => {
        closeModal();
        dispatch({type: DELETE_INGREDIENT_DETAILS});
    }, [dispatch, closeModal]);

    const currentIngredient = useSelector(selectIngredientDetails);
    
    //модальное окно
    const modal = useMemo(
        () => {
            return (
                <Modal onClose={closeIngredientModal} title='Детали ингредиента'>
                    {currentIngredient &&
                        <IngredientDetails ingredientData={currentIngredient}/>
                }
                </Modal>)
        }, [currentIngredient, closeIngredientModal]);

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
            {isModalVisible && modal} 
        </article>
        )
    })

    export default BurgerIngredients;
