import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element-block.module.css';
import PropTypes from 'prop-types';

export default function ConstructorElementBlock(props) {
        let selectedName = undefined;
        if(props.selectedBun) {selectedName = `${props.name} (${props.selectedBun})`}
        
        return (
            <>
                {!props.isLocked && <span className="pr-3"><DragIcon /></span>}
                {props.isLocked && <span className={`${styles.dragHidden} pr-3`}><DragIcon /></span>}
                <ConstructorElement 
                    type={props.type}
                    text={selectedName || props.name}
                    price={props.price}
                    thumbnail={props.image}
                    isLocked={props.isLocked}
                />
            </>
        )
    }

ConstructorElementBlock.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string,PropTypes.number]).isRequired,
    thumbnail: PropTypes.string,
    isLocked: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
    _id: PropTypes.string.isRequired,
    selectedBun: PropTypes.string,
    image: PropTypes.string,
}