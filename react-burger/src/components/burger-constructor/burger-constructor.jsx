import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElementBlock from './constructor-element-block/constructor-element-block';
import EmptyConstructorBlock from './empty-constructor-block/empty-constructor-block';
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import styles from './burger-constructor.module.css';
import { useModal } from "../../hooks/use-modal";
import PropTypes from 'prop-types';
import { SelectedBunContext } from '../../services/selected-bun-context';
import { TotalPriceContext } from '../../services/total-price-context';
import { ConstructorDataContext } from '../../services/constructor-data-context';
import { useContext } from 'react';
import { useOrderData } from '../../hooks/use-order-data';

function BurgerConstructor(props) {
    const [isModalVisible, openModal, closeModal] = useModal();
    const {selectedBun} = useContext(SelectedBunContext);
    const {totalPrice} = useContext(TotalPriceContext);
    const {constructorData, setConstructorData} = useContext(ConstructorDataContext);
    const orderData = [...constructorData, selectedBun];
    const [orderNum, getOrderNum, clearOrderNum] = useOrderData('https://norma.nomoreparties.space/api/orders', orderData);

    return ( 
        <article>
            <li className={`${styles.constructorElementBlock} ml-4`}>
                <ConstructorElementBlock ingredient={selectedBun} isLocked='true' selectedBun="верх" type="top"/>
            </li>
            <section className={`${styles.scroll} mt-4 mb-4`}>
                {constructorData.length > 0 ? (
                    <ul className={styles.listUl}>
                        {constructorData.map(item => {
                            if (item.type !== 'bun') {
                                return (
                                    <li className={`${styles.constructorElementBlock} ml-4`} key={item._id}>
                                        <ConstructorElementBlock ingredient={item}/>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                ) : (
                    <EmptyConstructorBlock />
                )}
            </section> 
            <li className={`${styles.constructorElementBlock} ml-4`}>
                <ConstructorElementBlock ingredient={selectedBun} isLocked='true' selectedBun="низ" type="bottom"/>
            </li>

            <span className={`${styles.preOrderInfo} mt-10`}>
                <span className={styles.prePriceInfo}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon />
                </span>
                <Button htmlType="button" type="primary" size="large" extraClass={`${styles.button} ml-2 mr-4`} 
                    onClick={async() => {
                        getOrderNum();
                        openModal();
                        }}>
                    <p className={`${styles.button_text} text text_type_main-small`}>Оформить заказ</p>
                </Button>
            </span>
            {isModalVisible && !orderNum.isLoading && !orderNum.hasError &&
                <Modal onClose={() => {closeModal(); clearOrderNum(); setConstructorData([])}}>
                    <OrderDetails orderNum={orderNum.num}/>
                </Modal>
            }
        </article>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default BurgerConstructor;