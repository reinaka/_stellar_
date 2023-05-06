import React from "react";
import styles from './supplement-block.module.css';

export default function SupplementBlock(props) {
    return (
        <span className={styles.supplementBlock}>
            <p className="text text_type_main-default text_color_inactive">{props.title}</p>
            <p className="text text_type_digits-default text_color_inactive">{props.info}</p>
        </span>
    )
}