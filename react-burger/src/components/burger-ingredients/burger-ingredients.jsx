import Tabs from './tabs/tabs';
import IngredientsBlock from "./ingredients-block/ingredients-block";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

export default function BurgerIngredients(props) {
    const buns = props.data.filter(item => item.type === 'bun');
    const sauces = props.data.filter(item => item.type === 'sauce');
    const fillings = props.data.filter(item => item.type === 'main');

    return (
        <article>
            <Tabs />
            <div className={styles.scroll}>
                <IngredientsBlock arr={buns} title='Булки' id='bun'/>
                <IngredientsBlock arr={sauces} title='Соусы' id='sauce'/>
                <IngredientsBlock arr={fillings} title='Начинки' id='main'/>
            </div>
        </article>
        )
    }

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
