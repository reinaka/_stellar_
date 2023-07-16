import { FC, useMemo } from "react";
import styles from './orders-in-process.module.css';
import { v4 as uuidv4 } from 'uuid';

type TProps = {
    title : string,
    active? : boolean,
    num : number[]
};

export const OrdersInProcess:FC<TProps> = (props) => {
    const columns = useMemo(() => {
        return props.num.length < 11
        ? (
            <div>
                {props.num.map((item, index) => (
                <li className={props.active ? styles.textColorActive : undefined} key={uuidv4()}>
                    <p className="text text_type_digits-default">{item}</p>
                </li>
                ))}
            </div>
        )
        : (
            <>
                <div>
                {props.num.map((item, index) => (
                    index < 10 && (
                        <li className={props.active ? styles.textColorActive : undefined} key={uuidv4()}>
                            <p className="text text_type_digits-default">{item}</p>
                        </li>
                    )
                ))}
                </div>
                <div>
                    {props.num.map((item, index) => (
                        index > 9 && index < 20 && (
                            <li className={props.active ? styles.textColorActive : undefined} key={uuidv4()}>
                                <p className="text text_type_digits-default">{item}</p>
                            </li>
                        )
                    ))}
                </div>
            </>
        )
    }, [props.active, props.num]);

    return (
        <div>
            <h2 className="text text_type_main-medium mb-6">{props.title}</h2>
            <ul className={styles.columns}>{columns}</ul>
        </div>
    )
}