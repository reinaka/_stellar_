import React from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element-block.module.css';
import PropTypes from 'prop-types';

class ConstructorElementBlock extends React.Component {
    render() {
        let selectedName = undefined;
        if(this.props.selectedBun) {selectedName = `${this.props.name} (${this.props.selectedBun})`}
        
        return (
            <div className={`${styles.constructorElementBlock} ml-4`} key={this.props._id}>
                {!this.props.isLocked && <span className="pr-3"><DragIcon /></span>}
                {this.props.isLocked && <span className={`${styles.dragHidden} pr-3`}><DragIcon /></span>}
                <ConstructorElement 
                    type={this.props.type}
                    text={selectedName || this.props.name}
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
    isLocked: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
    _id: PropTypes.string,
    selectedBun: PropTypes.string,
}

export default ConstructorElementBlock;