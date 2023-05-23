import Tabs from './tabs/tabs';
import IngredientsBlock from "./ingredients-block/ingredients-block";
import styles from './burger-ingredients.module.css';
import { BUN, MAIN, SAUCE } from '../../constants/constants';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useModal } from '../../hooks/use-modal';
import { useMemo, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../../services/actions/current-ingredient-actions';


const BurgerIngredients = memo(() => {
    const [isModalVisible, openModal, closeModal] = useModal();
    const dispatch = useDispatch();
    
    const openIngredientModal = useCallback(item => {
        dispatch({
            type: ADD_INGREDIENT_DETAILS,
            payload: item.ingredient,
        });
        openModal();
    }, [openModal, dispatch]);

    const closeIngredientModal = useCallback(() => {
        closeModal();
        dispatch({type: DELETE_INGREDIENT_DETAILS});
    }, [dispatch, closeModal]);

    const currentIngredient = useSelector(store => store.ingredientDetails);
    
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
            <Tabs />
                <div className={styles.scroll}>
                <IngredientsBlock title='Булки' id='bun' onClickHandler={openIngredientModal} filter={BUN}/>
                <IngredientsBlock title='Соусы' id='sauce' onClickHandler={openIngredientModal} filter={SAUCE}/>
                <IngredientsBlock title='Начинки' id='main' onClickHandler={openIngredientModal} filter={MAIN}/>
            </div>
            {isModalVisible && modal} 
        </article>
        )
    })

    export default BurgerIngredients;
