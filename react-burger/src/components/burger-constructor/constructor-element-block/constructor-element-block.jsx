import React from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element-block.module.css';
import PropTypes from 'prop-types';

class ConstructorElementBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${styles.constructorElementBlock} ml-4`}>
                    {!this.props.isLocked && <span className="pr-3"><DragIcon /></span>}
                    {this.props.isLocked && <span style={{visibility:'hidden'}} className="pr-3"><DragIcon /></span>}
                    <ConstructorElement 
                        type={this.props.type}
                        text={this.props.name}
                        price={this.props.price}
                        thumbnail={this.props.image}
                        isLocked={this.props.isLocked}
                    />
                </div>
        )
    }
}

ConstructorElementBlock.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    thumbnail: PropTypes.string,
    isLocked: PropTypes.bool,
}

export default ConstructorElementBlock;