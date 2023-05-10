import AppHeader from '../header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app-styles.module.css';
import { useIngredientsData } from '../../hooks/use-ingredients-data';
import { SelectedBunContext } from '../../services/selected-bun-context';
import { TotalPriceContext } from '../../services/total-price-context';
import { ConstructorDataContext } from '../../services/constructor-data-context';
import { useState, Provider, useEffect} from 'react';

export default function App(props) {
    const URLAddress = 'https://norma.nomoreparties.space/api/ingredients';
    const ingredientsData = useIngredientsData(URLAddress);
    const checkDataloadedCondition = !ingredientsData.isLoading && !ingredientsData.hasError && ingredientsData.data.length > 0;
    const [selectedBun, setSelectedBun] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [constructorData, setConstructorData] = useState([]);

    useEffect(
        () => {
            if (checkDataloadedCondition) {
                setSelectedBun(ingredientsData.data[0]);
                //setConstructorData(ingredientsData.data.filter(item => item.type !== 'bun'));
            }
        }, [ingredientsData]);

    useEffect(
        () => {
            if (checkDataloadedCondition) {
                const ingredientsTotal = constructorData.reduce((accum, currentValue) => accum + currentValue.price, 0);
                const total = (selectedBun.price * 2) + ingredientsTotal;
                setTotalPrice(total);
            }
        }, [constructorData, selectedBun]);

    return (
            <div className={styles.viewPort}>
                <AppHeader />
                <main className={styles.generalBlock}>
                    <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
                    <SelectedBunContext.Provider value={{selectedBun, setSelectedBun}}>
                        <ConstructorDataContext.Provider value={{constructorData, setConstructorData}}>
                            <TotalPriceContext.Provider value={{totalPrice, setTotalPrice}}>
                                {checkDataloadedCondition && 
                                    (<div className={styles.contentBlock}>
                                        <BurgerIngredients data={ingredientsData.data}/>
                                        <BurgerConstructor data={ingredientsData.data}/>
                                    </div>)
                                }
                            </TotalPriceContext.Provider>
                        </ConstructorDataContext.Provider>
                    </SelectedBunContext.Provider>
                </main>
            </div>
    )
}
