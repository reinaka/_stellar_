import Tabs from './tabs/tabs';
import IngredientsBlock from "./ingredients-block/ingredients-block";
import styles from './burger-ingredients.module.css';
import { BUN, MAIN, SAUCE } from '../../constants/constants';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useModal } from '../../hooks/use-modal';
import { useState, useMemo, memo, useCallback } from 'react';


const BurgerIngredients = memo(() => {
    const [isModalVisible, openModal, closeModal] = useModal();
    const [selectedIngredient, setSelectedIngredient] = useState();

    const handleIngredientModal = useCallback(item => {
        setSelectedIngredient(item);
        openModal();
    }, [openModal])

    const modal = useMemo(
        () => {
            return (
                <Modal onClose={closeModal} title='Детали ингредиента'>
                    {selectedIngredient &&
                        <IngredientDetails ingredientData={selectedIngredient}/>
                }
                </Modal>)
        }, [selectedIngredient, closeModal]);

    return (
        <article>
            <Tabs />
            <div className={styles.scroll}>
                <IngredientsBlock title='Булки' id='bun' onClickHandler={handleIngredientModal} filter={BUN}/>
                <IngredientsBlock title='Соусы' id='sauce' onClickHandler={handleIngredientModal} filter={SAUCE}/>
                <IngredientsBlock title='Начинки' id='main' onClickHandler={handleIngredientModal} filter={MAIN}/>
            </div>
            {isModalVisible && modal}
        </article>
        )
    })

    export default BurgerIngredients;
