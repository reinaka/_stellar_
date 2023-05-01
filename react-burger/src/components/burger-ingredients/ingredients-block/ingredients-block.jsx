import React from "react";
import styles from './ingredients-block.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from 'prop-types';

class IngredientsBlock extends React.Component {
    render() {
        return (
            <>
                <h2 className="text text_type_main-medium">{this.props.title}</h2>
                <section className={`${styles.main} pl-4 pr-4 pt-6 pb-10`}>
                    {this.props.arr.map(item => {
                            return (
                                <IngredientCard 
                                    name={item.name}
                                    image={item.image}
                                    price={item.price}
                                    quantity={item.name === 'Краторная булка N-200i' && '1'}
                                    keyId={item._id}
                                />
                            )
                        }
                    )}
                </section>
        </>
        )
    }
}

IngredientsBlock.propTypes = {
    title: PropTypes.string,
    arr: PropTypes.array,
}

export default IngredientsBlock;