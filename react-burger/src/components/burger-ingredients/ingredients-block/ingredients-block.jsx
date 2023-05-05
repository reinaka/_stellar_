import styles from './ingredients-block.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import Modal from "../../modal/modal";
import { useModal } from '../../../hooks/useModal';
import { useState } from 'react';
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import PropTypes from 'prop-types';

export default function IngredientsBlock(props) {
    const [isModalVisible, openModal, closeModal] = useModal();
    const [currentItem, setCurrentItem] = useState();

        return (
            <section>
                <h2 className="text text_type_main-medium">{props.title}</h2>
                <section className="pl-4 pr-4 pt-6 pb-10">
                    <ul className={styles.ulStyle}>
                        {props.arr.map(item => {
                                return (
                                    <li className={styles.liStyle} key={item._id} onClick={() => {openModal(); setCurrentItem(item);}}>
                                        <IngredientCard 
                                            ingredient={item} 
                                            quantity={item.name === 'Краторная булка N-200i' && '1'}
                                        />
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </section>
                {isModalVisible &&
                    <Modal onClose={closeModal} title='Детали ингредиента'>
                        <IngredientDetails ingredientData={currentItem}/>
                    </Modal>
                }
        </section>
    )
}

IngredientsBlock.propTypes = {
    title: PropTypes.string,
    arr: PropTypes.arrayOf(PropTypes.object).isRequired,
}