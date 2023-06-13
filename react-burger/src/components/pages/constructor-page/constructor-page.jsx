import BurgerConstructor from '../../burger-constructor/burger-constructor';
import BurgerIngredients from '../../burger-ingredients/burger-ingredients';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { selectAllIngredients } from '../../../services/functions/selectorFunctions';
import styles from './constructor-page.module.css';

export function ConstructorPage() {

    const {items, itemsRequest} = useSelector(selectAllIngredients);
    return (
        <>
        <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            {items && !itemsRequest && 
                (<div className={styles.contentBlock}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </div>)
            }
        </>
    )
}