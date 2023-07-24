import styles from './ingredient-details.module.css';
import SupplementBlock from "./supplement-block/supplement-block";
import { useAppSelector } from '../../../services/hooks/reduxTypes';
import { useParams } from 'react-router-dom';
import { selectAllIngredients, selectIngredientDetails } from '../../../services/functions/selectorFunctions';
import { TIngredient } from '../../../services/types/types';

export default function IngredientDetails() {
    const params = useParams();
    const selectedIngredient = useAppSelector(selectIngredientDetails);
    const allIngredients = useAppSelector(selectAllIngredients).items;

    const ingredientData = selectedIngredient 
                        ? selectedIngredient 
                        : allIngredients.filter((item : TIngredient) => item._id === params.ingredientId)[0];

    return ingredientData && (
        <div className={`${styles.wrapper} mb-5`}>
            <img src={ingredientData.image_large} alt={ingredientData.name}/>
            <p className="text text_type_main-medium">{ingredientData.name}</p>
            <div className={`${styles.supplementInfo} mt-8`}>
                <SupplementBlock title="Калории,ккал" info={ingredientData.calories}/>
                <SupplementBlock title="Белки,г" info={ingredientData.proteins}/>
                <SupplementBlock title="Жиры,г" info={ingredientData.fat}/>
                <SupplementBlock title="Углеводы,г" info={ingredientData.carbohydrates}/>
            </div>
        </div>
    )
}