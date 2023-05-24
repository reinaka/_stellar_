import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element-block.module.css';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { memo } from 'react';
import { INGREDIENT_ITEM } from '../../../constants/constants';
import { REORDER_INGREDIENTS_CONSTRUCTOR } from '../../../services/actions/constructor-actions';
import { useDispatch } from 'react-redux';

const ConstructorElementBlock = memo(
    (props) => {
        const dispatch = useDispatch();
        let selectedName = undefined;
        if(props.selectedBun) {selectedName = `${props.ingredient.name} (${props.selectedBun})`};
        const id = props.id;

        //dnd элемент, который перетаскиваем
        const [{ isDragging }, dragReorder] = useDrag(
            () => {return !props.draggableIngredient
            ? {type: INGREDIENT_ITEM}
            : ({
            type: INGREDIENT_ITEM,
            item: { uuid: props.draggableIngredient.uuid, originalIndex: props.findIngredient(props.draggableIngredient.uuid)},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const { uuid: droppedUuid, originalIndex } = item;
                const didDrop = monitor.didDrop()
                    if (!didDrop) {
                    dispatch({
                        type: REORDER_INGREDIENTS_CONSTRUCTOR, 
                        uuid: droppedUuid, 
                        index: originalIndex,
                    })
                }
            },
        })},[]);

        //dnd элемент, на место которого перетаскиваем
        const [, dropReorder] = useDrop(
            () => ({
                accept: INGREDIENT_ITEM,
                hover({uuid: draggedId}) {
                if (id !== props.draggableIngredient.uuid) {
                    const overIndex = props.findIngredient(props.draggableIngredient.uuid);
                    dispatch({
                        type: REORDER_INGREDIENTS_CONSTRUCTOR, 
                        uuid: draggedId, 
                        index: overIndex,
                    })
                }
                },
            }),
            [props.findIngredient],
        );

        const opacityWhileDragging = isDragging ? styles.dragInvisible :  styles.dragVisible;

        return (
            <div className={`${styles.constructorElementBlock} ${opacityWhileDragging} ${styles.bbb}`} 
                draggable={true} 
                ref={(node) => !props.isLocked && dragReorder(dropReorder(node))}
            > 
                {!props.isLocked && <span className="pr-3"><DragIcon /></span>}
                {props.isLocked && <span className={`${styles.dragHidden} pr-3`}><DragIcon /></span>}
                <ConstructorElement 
                    type={props.type}
                    text={selectedName || props.ingredient.name}
                    price={props.ingredient.price}
                    thumbnail={props.ingredient.image}
                    isLocked={props.isLocked}
                    handleClose={() => props.handleDelete(props.ingredientObject.uuid, 
                                                        props.ingredientObject.ingredient.price, 
                                                        props.ingredientObject.ingredient
                    )}
                />
            </div>
        )
    })

ConstructorElementBlock.propTypes = {
    type: PropTypes.string,
    ingredient: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number])),
    isLocked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedBun: PropTypes.string,
}

export default ConstructorElementBlock;