import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-element-block.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { memo, FC } from 'react';
import { INGREDIENT_ITEM } from '../../../constants/constants';
import { REORDER_INGREDIENTS_CONSTRUCTOR } from '../../../services/actions/constructor-actions';
import { useAppDispatch } from '../../../services/hooks/reduxTypes';
import { TIngredient, TIngredientWithUUID } from '../../../services/types/types';

type TProps = {
    selectedBun? : TIngredient,
    ingredient : TIngredient,
    ingredientObject? : TIngredientWithUUID,
    id? : string,
    draggableIngredient? : TIngredientWithUUID,
    findIngredient? : Function,
    handleDelete? : Function,
    isLocked? : string,
    bun? : string,
    type? : string,
};

const ConstructorElementBlock:FC<TProps> = memo(
    (props) => {
        const dispatch = useAppDispatch();
        let selectedName = undefined;
        if(props.bun) {selectedName = `${props.ingredient.name} (${props.bun})`};
        const id = props.id;

        //dnd элемент, который перетаскиваем
        const [{ isDragging }, dragReorder] = useDrag<{ uuid: string | undefined; originalIndex: any; }, {uuid : string, originalIndex : number}, { isDragging: boolean; }>(
            () => {
            return (!props.draggableIngredient || !props.findIngredient)
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
        const [, dropReorder] = useDrop<{uuid : number}>(
            () => ({
                accept: INGREDIENT_ITEM,
                hover({uuid: draggedId}) {
                if (props.findIngredient && props.draggableIngredient && id !== props.draggableIngredient.uuid) {
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

        return (
            <div className={`${styles.constructorElementBlock} ${isDragging ? styles.dragInvisible :  styles.dragVisible}`} 
                draggable={true} 
                ref={(node) => !props.isLocked && dragReorder(dropReorder(node))}
            > 
                {!props.isLocked && <span className="pr-3"><DragIcon type="primary"/></span>}
                {props.isLocked && <span className={`${styles.dragHidden} pr-3`}><DragIcon type="primary"/></span>}
                <ConstructorElement 
                    type={props.type === undefined ? undefined : props.type === "top" ? "top" : "bottom"}
                    text={selectedName || props.ingredient.name}
                    price={props.ingredient.price}
                    thumbnail={props.ingredient.image}
                    isLocked={props.isLocked ? true : false} 
                    handleClose={() => {
                        if(props.handleDelete && props.ingredientObject) props.handleDelete(
                                                        props.ingredientObject.uuid, 
                                                        props.ingredientObject.ingredient.price, 
                                                        props.ingredientObject.ingredient)
                    }}
                />
            </div>
        )
    })

export default ConstructorElementBlock;