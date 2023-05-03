import React, { useState, useEffect } from 'react';
import AppHeader from '../header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app-styles.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details/order-details';

export default function App(props) {
    const [state, setState] = useState({
        isLoading: true,
        hasError: false,
        data: []
    });
    
    const URLaddress = 'https://norma.nomoreparties.space/api/ingredients';
    useEffect(
        () => {
            const getData = () => {
                const address = URLaddress;
                fetch(address)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка ${res.status}`);
                    })
                    .then(apiData => setState({...state, data: apiData.data, isLoading: false, hasError: false}))
                    .catch(e => setState({...state, isLoading: false, hasError: true}))
            };
            getData();
        }, [])

    return (
        <>
            <div className={styles.viewPort}>
                <AppHeader />
                <div className={styles.generalBlock}>
                    <main>
                        <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
                        <div className={styles.contentBlock}>
                            <BurgerIngredients data={state.data}/>
                            <BurgerConstructor data={state.data}/>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
