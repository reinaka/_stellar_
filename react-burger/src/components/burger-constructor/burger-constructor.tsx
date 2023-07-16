import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
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
import { getOrderNum } from '../../services/actions/order-details-actions';
import { useModal } from '../../services/hooks/use-modal';
import { selectLoginSuccess } from '../../services/functions/selectorFunctions';
import { INGREDIENT } from '../../constants/constants';
import { v4 as uuidv4 } from 'uuid';
import { 
        selectBurgerConstructorItems, 
        selectSelectedBun, 
        selectConstructorTotalCost, 
        selectOrderNum 
    } from '../../services/functions/selectorFunctions';
import { BUN } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import { TIngredient, TIngredientWithUUID } from '../../services/types/types';
import { Price } from '../ui-elements/price/price';


function BurgerConstructor() {
    const items = useSelector(selectBurgerConstructorItems);
    const selectedBun = useSelector(selectSelectedBun);
    const totalCost = useSelector(selectConstructorTotalCost);
    const orderNum = useSelector(selectOrderNum);
    const loggedIn = useSelector(selectLoginSuccess);
    const [isModalVisible, openModal, closeModal] = useModal();
    const dispatch = useDispatch() as any;
    const navigate= useNavigate();

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
            if(selectedBun) {
                return (
                    <div className={`${styles.constructorElementBlock} ml-4`}>
                        <ConstructorElementBlock ingredient={selectedBun} isLocked="true" bun="верх" type="top"/>
                    </div>
                )
            }
        }
    , [selectedBun]);
    
    //нижняя булка
    const bottomBun = useMemo(
        () => {
            if(selectedBun) {
                return (
                    <div className={`${styles.constructorElementBlock} ml-4`}>
                        <ConstructorElementBlock ingredient={selectedBun} isLocked="true" bun="низ" type="bottom"/>
                    </div>
                )
            }
        }
    , [selectedBun])

    //хэндлер удаления ингредиентов из конструктора
    const deleteIngredientfromConstructor = useCallback((uuid : string, price : number) => {
        dispatch(deleteFromConstructor(items, uuid, price));
    }, [dispatch, items])

    //хэндлер для получения номера заказа
    const handleOrderNum = useCallback(() => {
        if(selectedBun) {
            if(loggedIn) {
                    const data = (items : TIngredientWithUUID[]) => {
                        let resultArr : string[] = [];
                            resultArr.push(selectedBun._id);
                            if (items.length) items.forEach(item => resultArr.push(item.ingredient._id));
                        return resultArr;
                    };
                    const dataToPost = {"ingredients": [...data(items)]};
                    dispatch(getOrderNum(dataToPost));
            } else {
                navigate("/login");
            }
        }
    },[dispatch, items, selectedBun, navigate, loggedIn]);

    //dnd добавление ингредиента в конструктор
    const [{ isHover }, dropTarget] = useDrop<TIngredient, void, {isHover : boolean}>({
        accept: INGREDIENT,
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            if(item.type === BUN) {
                dispatch(addToConstructor(item));
            } else {
                const uuid = uuidv4();
                dispatch(addToConstructor(item, uuid));
            }  
        }
    })

    //dnd получение индекса перетаскиваемого ингредиента
    const findIngredient = useCallback(
        (id : string) => {
            return items.findIndex((item : TIngredientWithUUID) => item.uuid === id);
        },[items]);

    return ( 
        <article>
            <div ref={dropTarget} className={isHover ? styles.borderStyling : styles.borderInvisible}>
                {(selectedBun && topBun) || <EmptyBunBlock />}
                <section className={`${styles.scroll} mt-4 mb-4`}>
                    {items.length > 0 ? (
                        <ul className={styles.listUl}>
                            {
                                items.map((item : TIngredientWithUUID) => {
                                    return (
                                        <li className={`${styles.constructorLi} ml-4`} key={item.uuid}>
                                            <ConstructorElementBlock 
                                                ingredient={item.ingredient} 
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
                {(selectedBun && bottomBun) || <EmptyBunBlock />}
            </div>            
            <span className={`${styles.preOrderInfo} mt-10`}>
                <Price price={totalCost} size="big" />
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