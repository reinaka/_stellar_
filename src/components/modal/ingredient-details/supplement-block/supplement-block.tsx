import styles from './supplement-block.module.css';
import { FC } from 'react';

type TProps = {
    title : string,
    info : string,
};

const SupplementBlock:FC<TProps> = (props) => {
    return (
        <span className={styles.supplementBlock}>
            <p className="text text_type_main-default text_color_inactive">{props.title}</p>
            <p className="text text_type_digits-default text_color_inactive">{props.info}</p>
        </span>
    )
}

export default SupplementBlock;