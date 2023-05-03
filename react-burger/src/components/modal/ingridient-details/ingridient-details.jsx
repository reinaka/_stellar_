import React from "react";
import styles from './ingridient-details.module.css';
import SupplementBlock from "./supplement-block/supplement-block";

export default function IngridientDetails(props) {
    return (
        <div className={`${styles.wrapper} mb-5`}>
            <img src={props.data.image_large} alt={props.data.name}/>
            <p className="text text_type_main-medium">{props.data.name}</p>
            <div className={`${styles.supplementInfo} mt-8`}>
                <SupplementBlock title="Калории,ккал" info={props.data.calories}/>
                <SupplementBlock title="Белки,г" info={props.data.proteins}/>
                <SupplementBlock title="Жиры,г" info={props.data.fat}/>
                <SupplementBlock title="Углеводы,г" info={props.data.carbohydrates}/>
            </div>
        </div>
    )
}