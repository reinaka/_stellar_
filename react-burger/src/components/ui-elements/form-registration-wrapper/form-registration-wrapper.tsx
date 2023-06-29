import { PropsWithChildren } from 'react';
import styles from './form-registration-wrapper.module.css';

export function RegistrationWrapper(props : PropsWithChildren) {
    return (
        <div className={styles.wrapper}>
            {props.children}
        </div>
    )
}