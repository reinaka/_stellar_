import React from "react";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';

class IngredientCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.main}>
                {this.props.quantity && (
                    <div className={styles.quantity}>
                        <p className="text text_type_digits-default">1</p>
                    </div>
                )}
                <img src={this.props.image} alt={this.props.name} className='pr-4 pl-4'/>
                <span className={`${styles.priceBlock} mt-1 mb-1 pr-4 pl-4 pt-1`}>
                    <p className="text text_type_digits-default">{this.props.price}</p>
                    <CurrencyIcon />
                </span>
                <p className={`text text_type_main-default ${styles.nameText}`}>{this.props.name}</p>
            </div>
        )
    }
}

IngredientCard.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    quantity: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
}

export default IngredientCard;