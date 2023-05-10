import styles from './ingredients-block.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import Modal from "../../modal/modal";
import { useModal } from '../../../hooks/use-modal';
import { useContext, useState } from 'react';
import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import PropTypes from 'prop-types';
import { SelectedBunContext } from '../../../services/selected-bun-context';
import { ConstructorDataContext } from '../../../services/constructor-data-context';

export default function IngredientsBlock(props) {
    const [isModalVisible, openModal, closeModal] = useModal();
    const [currentItem, setCurrentItem] = useState();
    const {selectedBun, setSelectedBun} = useContext(SelectedBunContext);
    const {constructorData, setConstructorData } = useContext(ConstructorDataContext);

    const addIngredient = (ingredient) => {
        if (ingredient.type !== 'bun') {
            let isInArr = false;
        if (ConstructorDataContext.length === 0) {
            setConstructorData([ingredient]);
        } else {
            constructorData.forEach(item => {
                if (item._id === ingredient._id) isInArr = true;
            });
            if (!isInArr) {
                setConstructorData([...constructorData, ingredient]);
            }
        }
        }
    }
    
        return (
            <section>
                <h2 className="text text_type_main-medium">{props.title}</h2>
                <section className="pl-4 pr-4 pt-6 pb-10">
                    <ul className={styles.ulStyle}>
                        {props.arr.map(item => {
                                return (
                                    <li className={styles.liStyle} key={item._id} 
                                        onClick={() => {
                                            openModal(); 
                                            setCurrentItem(item); 
                                            if (item.type==='bun') setSelectedBun(item);
                                            addIngredient(item);
                                        }}
                                    >
                                        <IngredientCard 
                                            ingredient={item} 
                                            quantity={selectedBun && item._id === selectedBun._id && '1'}
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
}