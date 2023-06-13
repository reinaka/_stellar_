import styles from './ingredient-details.module.css';
import SupplementBlock from "./supplement-block/supplement-block";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAllIngredients, selectIngredientDetails } from '../../../services/functions/selectorFunctions';

export default function IngredientDetails() {
    const params = useParams();
    const selectedIngredient = useSelector(selectIngredientDetails);
    const allIngredients = useSelector(selectAllIngredients).items;
    console.log(params);

    const ingredientData = selectedIngredient 
                        ? selectedIngredient 
                        : allIngredients.filter(item => item._id === params.ingredientId)[0];

    console.log(ingredientData);

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