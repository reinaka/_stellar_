import React from "react";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElementBlock from './constructor-element-block/constructor-element-block';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

class BurgerConstructor extends React.Component {
    render() {
        return ( 
            <div>
                <ConstructorElementBlock {...this.props.data[0]} isLocked='true' selectedBun="верх"/>
                <section className={`${styles.scroll} mt-4 mb-4`}>
                    {this.props.data.map(item => {
                        if (item.type !== 'bun') {
                            return (
                                <ul className={styles.listUl}>
                                    <ConstructorElementBlock {...item}/>
                                </ul>
                            )
                        }
                    })}
                </section> 
                <ConstructorElementBlock {...this.props.data[0]} isLocked='true' selectedBun="низ"/>

                <span className={`${styles.preOrderInfo} mt-10`}>
                    <span className={styles.prePriceInfo}>
                        <p className="text text_type_digits-medium">610</p>
                        <CurrencyIcon />
                    </span>
                    <Button htmlType="button" type="primary" size="large" extraClass={`${styles.button} ml-2 mr-4`}>
                        <p className={`${styles.button_text} text text_type_main-small`}>Оформить заказ</p>
                    </Button>
                </span>
            </div>
        )
    }
}

BurgerConstructor.propTypes = {
    data: PropTypes.array,
}

export default BurgerConstructor;