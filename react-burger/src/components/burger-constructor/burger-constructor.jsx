import React from "react";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElementBlock from './constructor-element-block/constructor-element-block';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

class BurgerConstructor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='mb-4'>
                    <ConstructorElementBlock 
                        name="Краторная булка N-200i (верх)"
                        price="1255"
                        image="https://code.s3.yandex.net/react/code/bun-02.png"
                        isLocked='true'
                    />
                </div>

                <section className={styles.scroll}>
                    {this.props.data.map(item => {
                        if (item.type !== 'bun') {
                            return (
                                <ConstructorElementBlock {...item}/>
                            )
                        }
                    })}
                </section> 

                <div className="mt-4">
                    <ConstructorElementBlock 
                        name="Краторная булка N-200i (низ)"
                        price="1255"
                        image="https://code.s3.yandex.net/react/code/bun-02.png"
                        isLocked='true'
                    /> 
                </div> 

                <span className={`${styles.preOrderInfo} mt-10`}>
                    <span className={styles.prePriceInfo}>
                        <p className="text text_type_digits-medium">610</p>
                        <CurrencyIcon />
                    </span>
                <Button style={{width: '215px'}} htmlType="button" type="primary" size="large" extraClass="ml-2 mr-4">
                    <p style={{fontSize: '16px'}} className="text text_type_main-small">Оформить заказ</p>
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