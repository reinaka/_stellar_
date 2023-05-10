import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element-block.module.css';
import PropTypes from 'prop-types';
import { ConstructorDataContext } from '../../../services/constructor-data-context';
import { useContext } from 'react';

export default function ConstructorElementBlock(props) {
    const {constructorData, setConstructorData} = useContext(ConstructorDataContext);
    const deleteIngredient = (ingredientID) => {
        const changedData = constructorData.filter(item => item._id !== ingredientID);
        setConstructorData(changedData);
    } 

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
                    isLocked={props.isLocked}
                    handleClose={() => deleteIngredient(props.ingredient._id)}
                />
            </>
        )
    }

ConstructorElementBlock.propTypes = {
    type: PropTypes.string,
    ingredient: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    isLocked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}