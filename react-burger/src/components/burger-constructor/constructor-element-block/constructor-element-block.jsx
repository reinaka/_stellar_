import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element-block.module.css';
import PropTypes from 'prop-types';

export default function ConstructorElementBlock(props) {
        let selectedName = undefined;
        if(props.selectedBun) {selectedName = `${props.ingredient.name} (${props.selectedBun})`}
        
        return (
            <>
                {!props.isLocked && <span className="pr-3"><DragIcon /></span>}
                {props.isLocked && <span className={`${styles.dragHidden} pr-3`}><DragIcon /></span>}
                <ConstructorElement 
                    type={props.type}
                    text={selectedName || props.ingredient.name}
                    price={props.ingredient.price}
                    thumbnail={props.ingredient.image}
                    isLocked={props.ingredient.isLocked}
                />
            </>
        )
    }

ConstructorElementBlock.propTypes = {
    type: PropTypes.string,
    ingredient: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
}