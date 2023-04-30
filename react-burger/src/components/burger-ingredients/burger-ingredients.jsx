import React from "react";
import Tabs from './tabs/tabs';
import IngredientsBlock from "./ingredients-block/ingredients-block";
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';


class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const buns = this.props.data.filter(item => item.type === 'bun');
        const sauces = this.props.data.filter(item => item.type === 'sauce');
        const fillings = this.props.data.filter(item => item.type === 'main');

        return (
            <section>
                <Tabs />
                <div className={styles.scroll}>
                    <IngredientsBlock arr={buns} title='Булки' id='bun'/>
                    <IngredientsBlock arr={sauces} title='Соусы' id='sauce'/>
                    <IngredientsBlock arr={fillings} title='Начинки' id='main'/>
                </div>
            </section>
        )
    }
}

BurgerIngredients.propTypes = {
    data: PropTypes.array,
}

export default BurgerIngredients;
