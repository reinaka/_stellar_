import IngredientDetails from "../../modal/ingredient-details/ingredient-details";
import styles from './ingredient-page.module.css';

export const IngredientPage = () => {
    return (
        <div className={styles.wrapper}>
            <IngredientDetails/>
        </div>
    )
}