import React from "react";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElementBlock from './constructor-element-block/constructor-element-block';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

class BurgerConstructor extends React.Component {
    render() {
        return ( 
            <article>
                <li className={`${styles.constructorElementBlock} ml-4`}>
                    <ConstructorElementBlock {...this.props.data[0]} isLocked='true' selectedBun="верх" type="top"/>
                </li>
                <section className={`${styles.scroll} mt-4 mb-4`}>
                    <ul className={styles.listUl}>
                        {this.props.data.map(item => {
                            if (item.type !== 'bun') {
                                return (
                                    <li className={`${styles.constructorElementBlock} ml-4`} key={item._id}>
                                        <ConstructorElementBlock {...item}/>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </section> 
                <li className={`${styles.constructorElementBlock} ml-4`}>
                    <ConstructorElementBlock {...this.props.data[0]} isLocked='true' selectedBun="низ" type="bottom"/>
                </li>

                <span className={`${styles.preOrderInfo} mt-10`}>
                    <span className={styles.prePriceInfo}>
                        <p className="text text_type_digits-medium">610</p>
                        <CurrencyIcon />
                    </span>
                    <Button htmlType="button" type="primary" size="large" extraClass={`${styles.button} ml-2 mr-4`}>
                        <p className={`${styles.button_text} text text_type_main-small`}>Оформить заказ</p>
                    </Button>
                </span>
            </article>
        )
    }
}

BurgerConstructor.propTypes = {
    data: PropTypes.array,
}

export default BurgerConstructor;