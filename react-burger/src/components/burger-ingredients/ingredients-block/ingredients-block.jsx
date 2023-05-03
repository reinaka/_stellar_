import React, { useState, useEffect } from "react";
import styles from './ingredients-block.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import Modal from "../../modal/modal";
import IngridientDetails from "../../modal/ingridient-details/ingridient-details";
import PropTypes from 'prop-types';

export default function IngredientsBlock(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    const handleModal = (item) => () => {
        setIsModalVisible(!isModalVisible);
        setSelectedData(item);
    }

    const closeOnKeyPress = () => (event) => {
        if (event.code === 'Escape') {
            setIsModalVisible(false);
        }
    }

    useEffect(
        (e) => {
            document.addEventListener('keydown', closeOnKeyPress(e));
            return document.removeEventListener('keydown', closeOnKeyPress(e))
        }, [])

        return (
            <section>
                <h2 className="text text_type_main-medium">{props.title}</h2>
                <section className="pl-4 pr-4 pt-6 pb-10">
                    <ul className={styles.ulStyle}>
                        {props.arr.map(item => {
                                return (
                                    <li className={styles.liStyle} key={item._id} onClick={handleModal(item)}>
                                        <IngredientCard 
                                            name={item.name}
                                            image={item.image}
                                            price={item.price}
                                            quantity={item.name === 'Краторная булка N-200i' && '1'}
                                        />
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </section>
                {isModalVisible &&
                <Modal onclick={handleModal()} visible={isModalVisible} title='Детали ингредиента'>
                    <IngridientDetails data={selectedData}/>
                </Modal>
            }
        </section>
        )
}

IngredientsBlock.propTypes = {
    title: PropTypes.string,
    arr: PropTypes.array,
}