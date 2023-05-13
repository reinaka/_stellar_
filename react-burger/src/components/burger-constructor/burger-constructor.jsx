import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElementBlock from './constructor-element-block/constructor-element-block';
import EmptyConstructorBlock from './empty-constructor-block/empty-constructor-block';
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import styles from './burger-constructor.module.css';
import { ConstructorDataContext } from '../../services/constructor-data-context';
import { useContext } from 'react';
import { useOrderData } from '../../hooks/use-order-data';
import { GET_ORDER_NUMBER_URL } from '../../constants/constants';
import { useMemo } from 'react';

function BurgerConstructor() {
    const {constructorState, constructorStateDispatch} = useContext(ConstructorDataContext);

    //хэндлер для удаления ингредиента из конструктора
    const deleteIngredient = (ingredient) => {
        constructorStateDispatch({type: 'deleteIngredient', payload: ingredient})
    }

    //получаю айдишники для отправления на сервер
    const dataToPost = useMemo(() => {
        let resultArr = [];
            if (constructorState.selectedBun) resultArr.push(constructorState.selectedBun._id);
            if (constructorState.ingredientsList) constructorState.ingredientsList.forEach(item => resultArr.push(item._id));
        return resultArr;
    }, [constructorState.selectedBun, constructorState.ingredientsList]);
    
    //получаю номер заказа и хэндлеры для управления номером заказа
    const [orderNum, getOrderNum, clearOrderNum] = useOrderData(GET_ORDER_NUMBER_URL, dataToPost)

    //модальное окно
    const modal = useMemo(
        () => { 
            const deleteAllIngredients = () => {
                constructorStateDispatch({type: 'deleteAllIngredients'})
            }
            return (<Modal onClose={() => {clearOrderNum(); deleteAllIngredients()}}>
                        <OrderDetails orderNum={orderNum.num}/>
                    </Modal>)
        }, [orderNum, clearOrderNum, constructorStateDispatch]);


    return ( 
        <article>
            <li className={`${styles.constructorElementBlock} ml-4`}>
                <ConstructorElementBlock ingredient={constructorState.selectedBun} isLocked='true' selectedBun="верх" type="top"/>
            </li>
                <section className={`${styles.scroll} mt-4 mb-4`}>
                    {constructorState.ingredientsList.length ? (
                        <ul className={styles.listUl}>
                            {constructorState.ingredientsList.map(item => {
                                    return (
                                        <li className={`${styles.constructorElementBlock} ml-4`} key={item._id}>
                                            <ConstructorElementBlock ingredient={item} handleDelete={deleteIngredient}/>
                                        </li>
                                    )})}
                        </ul>
                    ) : (
                        <EmptyConstructorBlock />
                    )}
                </section> 
            <li className={`${styles.constructorElementBlock} ml-4`}>
                <ConstructorElementBlock ingredient={constructorState.selectedBun} isLocked='true' selectedBun="низ" type="bottom"/>
            </li>

            <span className={`${styles.preOrderInfo} mt-10`}>
                <span className={styles.prePriceInfo}>
                    <p className="text text_type_digits-medium">{String(constructorState.totalPrice)}</p>
                    <CurrencyIcon />
                </span>
                <Button htmlType="button" type="primary" size="large" extraClass={`${styles.button} ml-2 mr-4`} 
                    onClick={() => getOrderNum()}>
                    <p className={`${styles.button_text} text text_type_main-small`}>Оформить заказ</p>
                </Button>
            </span>
            {orderNum.num && modal}
        </article>
    )
}

export default BurgerConstructor;