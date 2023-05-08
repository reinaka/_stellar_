import AppHeader from '../header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app-styles.module.css';
import { useIngredientsData } from '../../hooks/useIngredientsData';

export default function App(props) {
    const URLAddress = 'https://norma.nomoreparties.space/api/ingredients';
    const state = useIngredientsData(URLAddress);

    return (
            <div className={styles.viewPort}>
                <AppHeader />
                <main className={styles.generalBlock}>
                    <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
                    {!state.isLoading && !state.hasError && state.data.length >0 && 
                        (<div className={styles.contentBlock}>
                            <BurgerIngredients data={state.data}/>
                            <BurgerConstructor data={state.data}/>
                        </div>)
                    }
                </main>
            </div>
    )
}
