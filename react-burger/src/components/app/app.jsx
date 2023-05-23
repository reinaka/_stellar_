import AppHeader from '../header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app-styles.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../services/actions/all-ingredients-actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    const {items, itemsRequest} = useSelector(store => store.burgerIngredients);

    return (
            <div className={styles.viewPort}>
                <AppHeader />
                <main className={styles.generalBlock}>
                    <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
                        {items && !itemsRequest && 
                            (<div className={styles.contentBlock}>
                                <DndProvider backend={HTML5Backend}>
                                    <BurgerIngredients />
                                    <BurgerConstructor />
                                </DndProvider>
                            </div>)
                        }
                </main>
            </div>
    )
}
