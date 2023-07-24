import styles from './ingredients-block.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import { memo, useRef, useEffect, useMemo, FC } from 'react';
import { selectAllIngredientsItems } from '../../../services/functions/selectorFunctions';
import { TIngredient } from '../../../services/types/types';
import { useAppSelector } from '../../../services/hooks/reduxTypes';

type TProps = {
    title : string,
    onClickHandler : Function,
    filter : string,
    setCurrentSection : Function,
};

const IngredientsBlock:FC<TProps> = memo((props) => {
    const ingredientsData = useAppSelector(selectAllIngredientsItems);
    const ingredients = useMemo(() => ingredientsData.filter((item : TIngredient) => item.type === props.filter), [props.filter, ingredientsData]);
    const setCurrentSection = props.setCurrentSection;

    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) setCurrentSection(props.filter);
            })
        },
        {
            rootMargin: '-45% 0px -45% 0px',
        });
        if(ref.current) observer.observe(ref.current);
    }, [props.filter, setCurrentSection]);
    
        return (
            <section className='observedSection' id={`${props.filter}_id`}>
                <h2 className="text text_type_main-medium">{props.title}</h2>
                <div ref={ref} className="pl-4 pr-4 pt-6 pb-10">
                    <ul className={styles.ulStyle}>
                        {ingredients.map(item => {
                                return (
                                    <li className={styles.liStyle} key={item._id} 
                                    onClick={() => props.onClickHandler(item)}>
                                        <IngredientCard ingredient={item} />
                                    </li>)
                                }
                        )}
                    </ul>
                </div>
        </section>
    )
});

export default IngredientsBlock;