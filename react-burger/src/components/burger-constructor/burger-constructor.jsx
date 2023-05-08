import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElementBlock from './constructor-element-block/constructor-element-block';
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import styles from './burger-constructor.module.css';
import { useModal } from "../../hooks/useModal";
import { useState } from 'react';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
    const [isModalVisible, openModal, closeModal] = useModal();

    return ( 
        <article>
            <li className={`${styles.constructorElementBlock} ml-4`}>
                <ConstructorElementBlock ingredient={props.data[0]} isLocked='true' selectedBun="верх" type="top"/>
            </li>
            <section className={`${styles.scroll} mt-4 mb-4`}>
                <ul className={styles.listUl}>
                    {props.data.map(item => {
                        if (item.type !== 'bun') {
                            return (
                                <li className={`${styles.constructorElementBlock} ml-4`} key={item._id}>
                                    <ConstructorElementBlock ingredient={item}/>
                                </li>
                            )
                        }
                    })}
                </ul>
            </section> 
            <li className={`${styles.constructorElementBlock} ml-4`}>
                <ConstructorElementBlock ingredient={props.data[0]} isLocked='true' selectedBun="низ" type="bottom"/>
            </li>

            <span className={`${styles.preOrderInfo} mt-10`}>
                <span className={styles.prePriceInfo}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon />
                </span>
                <Button htmlType="button" type="primary" size="large" extraClass={`${styles.button} ml-2 mr-4`} onClick={openModal}>
                    <p className={`${styles.button_text} text text_type_main-small`}>Оформить заказ</p>
                </Button>
            </span>
            {isModalVisible &&
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            }
        </article>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default BurgerConstructor;