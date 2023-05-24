import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElementBlock from './constructor-element-block/constructor-element-block';
import EmptyConstructorBlock from './empty-constructor-block/empty-constructor-block';
import { EmptyBunBlock } from './empty-bun-block/empty-bun-block';
import Modal from "../modal/modal";
import OrderDetails from "../modal/order-details/order-details";
import styles from './burger-constructor.module.css';
import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addToConstructor, deleteFromConstructor } from '../../services/actions/constructor-actions';
import { INCREASE_INGREDIENT_QUANTITY, DECREASE_INGREDIENT_QUANTITY } from '../../services/actions/all-ingredients-actions';
import { getOrderNum } from '../../services/actions/order-details-actions';
import { useModal } from '../../hooks/use-modal';
import { INGREDIENT } from '../../constants/constants';

function BurgerConstructor() {
    const items = useSelector(store => store.burgerConstructor.items);
    const selectedBun = useSelector(store => store.burgerConstructor.selectedBun);
    const totalCost = useSelector(store => store.burgerConstructor.totalCost);
    const orderNum = useSelector(store => store.orderDetails.orderNum);
    const [isModalVisible, openModal, closeModal] = useModal();
    const dispatch = useDispatch();

    //модальное окно
    const modal = useMemo(
        () => orderNum && (
                (<Modal onClose={() => closeModal()}>
                    <OrderDetails orderNum={orderNum}/>
                </Modal>)
            )
            , [closeModal, orderNum]);

    //верхняя булка
    const topBun = useMemo(
        () => {
            return (<div className={`${styles.constructorElementBlock} ml-4`}>
                <ConstructorElementBlock ingredient={selectedBun} isLocked='true' selectedBun="верх" type="top"/>
                </div>)
        }
    , [selectedBun]);
    
    //нижняя булка
    const bottomBun = useMemo(
        () => {
            return (
                <div className={`${styles.constructorElementBlock} ml-4`}>
                    <ConstructorElementBlock ingredient={selectedBun} isLocked='true' selectedBun="низ" type="bottom"/>
                </div>
            )
        }
    , [selectedBun])

    //хэндлер удаления ингредиентов из конструктора
    const deleteIngredientfromConstructor = useCallback((uuid, price, item) => {
        dispatch(deleteFromConstructor(items, uuid, price));
        dispatch({type: DECREASE_INGREDIENT_QUANTITY, id: item._id, checkType: item.type});
    }, [dispatch, items])

    //хэндлер для получения номера заказа
    const handleOrderNum = useCallback(() => {
        //получаю айдишники для отправления на сервер
        if(selectedBun) {
            const getDataToPost = (items) => {
                let resultArr = [];
                    resultArr.push(selectedBun._id);
                    if (items.length) items.forEach(item => resultArr.push(item.ingredient._id));
                return resultArr;
            };
            const dataToPost = {"ingredients": [...getDataToPost(items)]};
            dispatch(getOrderNum(dataToPost));
        }
    },[dispatch, items, selectedBun]);

    //dnd добавление ингредиента в конструктор
    const [{ isHover }, dropTarget] = useDrop({
        accept: INGREDIENT,
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch(addToConstructor(item));
            dispatch({type: INCREASE_INGREDIENT_QUANTITY, id: item._id, checkType: item.type});
        }
    })
    const borderColor = isHover ? styles.borderStyling : styles.borderInvisible;

    //dnd получение индекса перетаскиваемого ингредиента
    const findIngredient = useCallback(
        (id) => {
            const draggableItem = items.filter((item) => item.uuid === id)[0];
            return items.indexOf(draggableItem);
        },[items]);

    return ( 
        <article>
            <div ref={dropTarget} className={borderColor}>
                {selectedBun && topBun || <EmptyBunBlock />}
                <section className={`${styles.scroll} mt-4 mb-4`}>
                    {items.length > 0 ? (
                        <ul className={styles.listUl}>
                            {
                                items.map((item, index) => {
                                    return (
                                        <li className={`${styles.constructorLi} ml-4`} key={item.uuid}>
                                            <ConstructorElementBlock ingredient={item.ingredient} 
                                                handleDelete={deleteIngredientfromConstructor} 
                                                findIngredient={findIngredient}
                                                draggableIngredient={item}
                                                ingredientObject={item}
                                                id={item.ingredient._id}
                                            />
                                        </li>
                                )})
                            }
                        </ul>
                    ) : (
                        <EmptyConstructorBlock />
                    )}
                </section> 
                {selectedBun && bottomBun || <EmptyBunBlock />}
            </div>            
            <span className={`${styles.preOrderInfo} mt-10`}>
                <span className={styles.prePriceInfo}>
                    <p className="text text_type_digits-medium">{totalCost}</p>
                    <CurrencyIcon />
                </span>
                <Button htmlType="button" type="primary" size="large" extraClass={`${styles.button} ml-2 mr-4`} 
                    onClick={() => {handleOrderNum(); openModal()}}>
                    <p className={`${styles.button_text} text text_type_main-small`}>Оформить заказ</p>
                </Button>
            </span>
            {orderNum && isModalVisible && modal}
        </article>
    )
}

export default BurgerConstructor;