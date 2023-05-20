import AppHeader from '../header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app-styles.module.css';
import { useReducer, useMemo, useEffect } from 'react';
import { useIngredientsData } from '../../hooks/use-ingredients-data';
import { ConstructorDataContext } from '../../services/constructor-data-context';
import { AllIngredientsContext } from '../../services/all-ingredients-context';
import { GET_INGREDIENTS_URL } from '../../constants/constants';

const constructorInitialState = {
    ingredietsList: [],
    selectedBun: null,
    totalPrice: 0,
};

function constructorReducer(state, action) {
    const updatedConstructorState = {
        ingredientsList: state.ingredientsList,
        selectedBun: state.selectedBun,
        totalPrice: state.totalPrice,
    };
    switch(action.type) {
        case 'uploadData':
            updatedConstructorState.ingredientsList = action.payload.filling;
            updatedConstructorState.selectedBun = action.payload.bun;
            updatedConstructorState.totalPrice = action.payload.filling.reduce((accum, currentValue) => accum + currentValue.price, 0) + action.payload.bun.price *2;
            return updatedConstructorState;
        case 'deleteIngredient':
            updatedConstructorState.ingredientsList = state.ingredientsList.filter(item => item._id !== action.payload._id);
            updatedConstructorState.totalPrice -= action.payload.price;
            return updatedConstructorState;
        case 'deleteAllIngredients':
            updatedConstructorState.ingredientsList = [];
            updatedConstructorState.totalPrice = state.selectedBun.price * 2;
            return updatedConstructorState;
        default:
            throw new Error(e => `Something went wrong: ${e}`)
    }
}

export default function App() {
    const ingredientsData = useIngredientsData(GET_INGREDIENTS_URL);
    const checkDataLoadedCondition = !ingredientsData.isLoading && !ingredientsData.hasError && ingredientsData.data.length > 0;

    const [constructorState, constructorStateDispatch] = useReducer(constructorReducer, constructorInitialState);
    
    const constructorContextData = useMemo(() => {
        return {constructorState, constructorStateDispatch};
    }, [constructorState, constructorStateDispatch]);

    //наполняю стейт конструктора ингредиентами
    useEffect(() => {
        if (!ingredientsData.data.length) return;
        function getElements() {
            const saucesAndFillings = ingredientsData.data.filter(item => item.type !== 'bun').splice(Math.floor(Math.random() * 5), 5);
            constructorStateDispatch({type: 'uploadData', payload: {filling:saucesAndFillings, bun: ingredientsData.data[0]}})
        }
        getElements();
    }, [ingredientsData])

    return (
            <div className={styles.viewPort}>
                <AppHeader />
                <main className={styles.generalBlock}>
                    <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
                        {checkDataLoadedCondition && constructorState.selectedBun && 
                            (<div className={styles.contentBlock}>
                                <AllIngredientsContext.Provider value={ingredientsData.data}>
                                    <BurgerIngredients />
                                </AllIngredientsContext.Provider>
                                <ConstructorDataContext.Provider value={constructorContextData}>
                                    <BurgerConstructor />
                                </ConstructorDataContext.Provider>
                            </div>)
                        }
                </main>
            </div>
    )
}
