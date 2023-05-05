import styles from './ingredient-details.module.css';
import SupplementBlock from "./supplement-block/supplement-block";
import PropTypes from 'prop-types';

export default function IngredientDetails(props) {
    return (
        <div className={`${styles.wrapper} mb-5`}>
            <img src={props.ingredientData.image_large} alt={props.ingredientData.name}/>
            <p className="text text_type_main-medium">{props.ingredientData.name}</p>
            <div className={`${styles.supplementInfo} mt-8`}>
                <SupplementBlock title="Калории,ккал" info={props.ingredientData.calories}/>
                <SupplementBlock title="Белки,г" info={props.ingredientData.proteins}/>
                <SupplementBlock title="Жиры,г" info={props.ingredientData.fat}/>
                <SupplementBlock title="Углеводы,г" info={props.ingredientData.carbohydrates}/>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredientData: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,])).isRequired,
}